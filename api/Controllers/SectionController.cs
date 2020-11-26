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
    public class SectionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SectionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Section
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Section>>> GetSections()
        {
            return await _context.Sections.ToListAsync();
        }

        // GET: api/Section/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDetailsView>> GetSection(long id)
        {
            var query = from s in _context.Sections
                    .AsNoTracking()
                    .Include(s => s.Text)
                    .Where(s => s.Id == id)
                select s;

            var section = await query.SingleOrDefaultAsync();

            if (section == null)
            {
                return NotFound();
            }

            return Ok(section.ToDetailsView());
        }

        private bool SectionExists(long id)
        {
            return _context.Sections.Any(e => e.Id == id);
        }
    }

    internal static class SectionControllerExtensions
    {
        public static string[] GetParagraphs(this Section section)
        {
            var paragraphs = section.Content.Split('\n');
            return paragraphs.Select(pg => String.Concat(pg, " ")).ToArray();
        }

        public static SectionDetailsView ToDetailsView(this Section section)
        {
            if (section == null)
            {
                return null;
            }

            var detailsView = new SectionDetailsView
            {
                Title = section.Title,
                TextTitle = section.Text.Title,
                ContentParagraphs = section.GetParagraphs()
            };

            return detailsView;
        }
    }
}
