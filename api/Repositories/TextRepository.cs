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
    public interface ITextRepository
    {
        IEnumerable<TextListView> Get();
        Task<Text> GetById(long id);
    }

    public class TextRepository : ITextRepository
    {
        private readonly ApplicationDbContext _context;

        public TextRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TextListView> Get()
        {
            List<TextListView> texts = new List<TextListView>();

            var query = from t in _context.Texts
                    .AsNoTracking()
                    .Include(t => t.Sections)
                select t;

            foreach (var text in query)
            {
                texts.Add(text.ToListView());
            }

            return texts;
        }

        public async Task<Text> GetById(long id)
        {
            var query = from t in _context.Texts
                    .AsNoTracking()
                    .Include(t => t.Sections)
                    .Where(t => t.Id == id)
                select t;

            var text = await query.SingleOrDefaultAsync();

            return text;
        }
    }
}