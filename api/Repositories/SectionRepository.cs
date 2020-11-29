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
    public interface ISectionRepository
    {
        public IEnumerable<SectionListView> Get();

        public Task<SectionDetailsView> GetById(long id);
    }

    public class SectionRepository : ISectionRepository
    {
        private readonly ApplicationDbContext _context;

        public SectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<SectionListView> Get()
        {
            List<SectionListView> sections = new List<SectionListView>();

            var query = from s in _context.Sections
                    .AsNoTracking()
                select s;

            foreach (var section in query)
            {
                sections.Add(section.ToListView());
            }

            return sections;
        }

        public async Task<SectionDetailsView> GetById(long id)
        {
            var query = from s in _context.Sections
                    .AsNoTracking()
                    .Include(s => s.Text)
                    .Where(s => s.Id == id)
                select s;

            var section = await query.SingleOrDefaultAsync();

            return section.ToDetailsView();
        }
    }
}