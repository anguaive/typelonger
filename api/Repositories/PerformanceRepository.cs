using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Data;
using api.Models;
using api.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public interface IPerformanceRepository
    {
        public IEnumerable<PerformanceListView> Get();

        public Task<PerformanceListView> GetById(long id);

        public Task<Performance> Post(string username, NewPerformance newPerformance);
    }

    public class PerformanceRepository : IPerformanceRepository
    {
        private readonly ApplicationDbContext _context;

        public PerformanceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PerformanceListView> Get()
        {
            List<PerformanceListView> performances = new List<PerformanceListView>();

            var query = from p in _context.Performances
                    .AsNoTracking()
                    .Include(p => p.RawStats)
                    .Include(p => p.Alias)
                    .ThenInclude(a => a.User)
                    .Include(p => p.Section)
                    .ThenInclude(s => s.Text)
                select p;

            foreach (var performance in query)
            {
                performances.Add(performance.ToListView());
            }

            return performances;
        }

        public async Task<PerformanceListView> GetById(long id)
        {
            var query = from p in _context.Performances
                    .AsNoTracking()
                    .Include(p => p.RawStats)
                    .Include(p => p.Alias)
                    .ThenInclude(a => a.User)
                    .Include(p => p.Section)
                    .ThenInclude(s => s.Text)
                select p;

            var performance = await query.SingleOrDefaultAsync();

            return performance.ToListView();
        }

        public async Task<Performance> Post(string username, NewPerformance newPerformance)
        {
            // TODO: Error handling

            var userQuery = from user in _context.ApplicationUsers
                    .Where(user => user.NormalizedUserName == username.ToUpper())
                select user;

            var dbUser = await userQuery.SingleOrDefaultAsync();

            var aliasQuery = from alias in _context.Aliases
                    .Where(alias => alias.Id == dbUser.SelectedAliasId)
                select alias;

            var dbAlias = await aliasQuery.SingleOrDefaultAsync();

            var performance = new Performance
            {
                Points = 0, // TODO: points algorithm
                ReplayData = "", // TODO
                DateOfCompletion = DateTime.UtcNow,
                AliasId = dbUser.SelectedAliasId,
                SectionId = newPerformance.SectionId,
                RawStats = newPerformance.SegmentStats
            };

            await _context.Performances.AddAsync(performance);

            dbAlias.Points = dbAlias.Performances.Sum(perfs => perfs.Points);
            dbAlias.Time = dbAlias.Performances.Sum(perfs => perfs.RawStats.Sum(rawStats => rawStats.Time));
            var keypressCount = dbAlias.Performances.Sum(perfs =>
                perfs.RawStats.Sum(rawStats => rawStats.CorrectKeypressCount + rawStats.IncorrectKeypressCount));
            var correctKeypressCount = dbAlias.Performances.Sum(perfs =>
                perfs.RawStats.Sum(rawStats => rawStats.CorrectKeypressCount));
            dbAlias.Wpm = dbAlias.Time == 0 ? 0 : (double) correctKeypressCount / 5 / ((double)dbAlias.Time / 1000 / 60);
            dbAlias.Accuracy = keypressCount == 0 ? 0 : (correctKeypressCount / (double) keypressCount) * 100;

            await _context.SaveChangesAsync();
            return performance;
        }
    }
}