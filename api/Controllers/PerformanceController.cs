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
    public class PerformanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PerformanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Performance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Performance>>> GetPerformances()
        {
            return await _context.Performances.ToListAsync();
        }

        // GET: api/Performance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Performance>> GetPerformance(long id)
        {
            var performance = await _context.Performances.FindAsync(id);

            if (performance == null)
            {
                return NotFound();
            }

            return performance;
        }

        // PUT: api/Performance/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerformance(long id, Performance performance)
        {
            if (id != performance.Id)
            {
                return BadRequest();
            }

            _context.Entry(performance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PerformanceExists(id))
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

        // POST: api/Performance
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Performance>> PostPerformance(Performance performance)
        {
            _context.Performances.Add(performance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerformance", new { id = performance.Id }, performance);
        }

        // DELETE: api/Performance/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Performance>> DeletePerformance(long id)
        {
            var performance = await _context.Performances.FindAsync(id);
            if (performance == null)
            {
                return NotFound();
            }

            _context.Performances.Remove(performance);
            await _context.SaveChangesAsync();

            return performance;
        }

        private bool PerformanceExists(long id)
        {
            return _context.Performances.Any(e => e.Id == id);
        }
    }
}
