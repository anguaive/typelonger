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
        public ActionResult<IEnumerable<PerformanceDetailsView>> GetPerformances()
        {
            List<PerformanceDetailsView> performances = new List<PerformanceDetailsView>();

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
                performances.Add(performance.ToDetailsViewModel());
            }

            return Ok(performances);
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

        // POST: api/Performance
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Performance>> PostPerformance(Performance performance)
        {
            _context.Performances.Add(performance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerformance", new {id = performance.Id}, performance);
        }

        private bool PerformanceExists(long id)
        {
            return _context.Performances.Any(e => e.Id == id);
        }
    }

    internal static class PerformanceControllerExtensions
    {
        public static PerformanceDetailsView ToDetailsViewModel(this Performance performance)
        {
            if (performance == null)
            {
                return null;
            }

            var time = performance.RawStats.Sum(stats => stats.Time);
            var correctKeypressCount = performance.RawStats.Sum(stats => stats.CorrectKeypressCount);
            var keypressCount =
                performance.RawStats.Sum(stats => stats.CorrectKeypressCount + stats.IncorrectKeypressCount);
            var wpm = (double)correctKeypressCount / 5 / ((double)time / 1000 / 60);
            var accuracy = (correctKeypressCount / (double)keypressCount) * 100;

            var detailsView = new PerformanceDetailsView
            {
                Username = performance.Alias.User.UserName,
                AliasName = performance.Alias.Name,
                TextTitle = performance.Section.Text.Title,
                SectionTitle = performance.Section.Title,
                Date = performance.DateOfCompletion,
                Points = performance.Points,
                Time = time,
                Wpm = wpm,
                Accuracy = accuracy,
                // TODO: Compute rank
                Rank = PerformanceRank.Normal
            };

            return detailsView;
        }
    }
}