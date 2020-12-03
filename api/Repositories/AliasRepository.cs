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
    public interface IAliasRepository
    {
        public IEnumerable<AliasListView> Get();

        public Task<AliasDetailsView> GetById(long id);

        public Task<AliasDetailsView> Post(string username, string aliasName);

        public Task<bool> Patch(long id, AliasDetailsView alias);
    }

    public class AliasRepository : IAliasRepository
    {
        private readonly ApplicationDbContext _context;

        public AliasRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<AliasListView> Get()
        {
            var aliases = new List<AliasListView>();

            var query = from a in _context.Aliases
                .AsNoTracking()
                .Include(a => a.User)
                select a;

            foreach (var alias in query)
            {
                aliases.Add(alias.ToListViewModel());
            }

            return aliases;
        }

        public async Task<AliasDetailsView> GetById(long id)
        {
            var query = from a in _context.Aliases
                    .AsNoTracking()
                    .Where(a => a.Id == id)
                select a;

            var alias = await query.SingleOrDefaultAsync();

            return alias.ToDetailsView();
        }

        public async Task<AliasDetailsView> Post(string username, string aliasName)
        {
            var query = from u in _context.ApplicationUsers
                    .Where(user => user.NormalizedUserName == username.ToUpper())
                    .Include(user => user.Aliases)
                select u;

            var user = await query.SingleOrDefaultAsync();
            var isAliasDuplicate = user.Aliases.FindIndex(a =>
                string.Equals(a.Name, aliasName, StringComparison.CurrentCultureIgnoreCase)) != -1;
            if (isAliasDuplicate)
            {
                return null;
            }

            var alias = new Alias
            {
                Name = aliasName,
                DateOfCreation = DateTime.UtcNow,
                Points = 0,
                Time = 0,
                Wpm = 0,
                Accuracy = 0,
                Rank = 0,
                UserId = user.Id,
            };

            await _context.Aliases.AddAsync(alias);

            await _context.SaveChangesAsync();
            return alias.ToDetailsView();
        }

        public async Task<bool> Patch(long id, AliasDetailsView alias)
        {
            var query = from a in _context.Aliases
                    .Where(a => a.Id == id)
                select a;

            var dbAlias = await query.SingleOrDefaultAsync();
            if (dbAlias == null)
            {
                return false;
            }

            dbAlias.Points = alias.Points;
            dbAlias.Time = alias.Time;
            dbAlias.Wpm = alias.Wpm;
            dbAlias.Accuracy = alias.Accuracy;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}