using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

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
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts()
        {
            return await _context.Texts.ToListAsync();
        }

        // GET: api/Text/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetText(long id)
        {
            var text = await _context.Texts.FindAsync(id);

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }

        // PUT: api/Text/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutText(long id, Text text)
        {
            if (id != text.Id)
            {
                return BadRequest();
            }

            _context.Entry(text).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TextExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Text
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Text>> PostText(Text text)
        {
            _context.Texts.Add(text);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetText", new { id = text.Id }, text);
        }

        // DELETE: api/Text/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Text>> DeleteText(long id)
        {
            var text = await _context.Texts.FindAsync(id);
            if (text == null)
            {
                return NotFound();
            }

            _context.Texts.Remove(text);
            await _context.SaveChangesAsync();

            return text;
        }

        private bool TextExists(long id)
        {
            return _context.Texts.Any(e => e.Id == id);
        }
    }
}
