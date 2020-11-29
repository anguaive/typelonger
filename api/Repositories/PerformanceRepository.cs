using System.Collections;
using System.Collections.Generic;
using System.Linq;
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

        public Performance GetById(long id);

        public void Post(Performance performance);
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

        public Performance GetById(long id)
        {
            throw new System.NotImplementedException();
        }

        public void Post(Performance performance)
        {
            throw new System.NotImplementedException();
        }
    }
}