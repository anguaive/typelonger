using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TextController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Text
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<TextListView>> GetTexts()
        {
            List<TextListView> texts = new List<TextListView>();

            var query = from t in _context.Texts
                    .AsNoTracking()
                    .Include(t => t.Sections)
                select t;

            foreach(var text in query)
            {
                texts.Add(text.ToListView());
            }

            return Ok(texts);
        }

        // GET: api/Text/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetText(long id)
        {
            var query = from t in _context.Texts
                    .AsNoTracking()
                    .Include(t => t.Sections)
                    .ThenInclude(s => s.Performances)
                    .Where(t => t.Id == id)
                select t;

            var text = await query.SingleOrDefaultAsync();

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }

        private bool TextExists(long id)
        {
            return _context.Texts.Any(e => e.Id == id);
        }
    }

    internal static class TextControllerExtensions
    {
        public static TextListView ToListView(this Text text)
        {
            if (text == null)
            {
                return null;
            }

            var listView = new TextListView
            {
                Id = text.Id,
                Title = text.Title,
                Author = text.Author,
                Genres = text.Genres,
                SectionCount = text.Sections.Count,
                Length = text.Sections.Sum(section => section.Content.Length)
            };

            return listView;
        }
    }
}
