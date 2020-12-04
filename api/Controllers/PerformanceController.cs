using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Repositories;
using api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformanceController : ControllerBase
    {
        private readonly IPerformanceRepository _repository;

        public PerformanceController(IPerformanceRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PerformanceListView>> Get()
        {
            var performances = _repository.Get();

            return Ok(performances);
        }

        [HttpGet("{id}")]

        public ActionResult<PerformanceListView> GetById(long id)
        {
            var performance = _repository.GetById(id);

            if (performance == null)
            {
                return NotFound();
            }

            return Ok(performance);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PerformanceListView>> Post([FromBody] NewPerformance newPerformance)
        {
            var username = User.Identity.Name;

            var dbPerformance = await _repository.Post(username, newPerformance);
            if (dbPerformance == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetById), new {id = dbPerformance.Id}, dbPerformance);
        }


    }

    internal static class PerformanceControllerExtensions
    {
        public static PerformanceListView ToListView(this Performance performance)
        {
            if (performance == null)
            {
                return null;
            }


            long time = 0;
            int correctKeypressCount = 0,
                keypressCount = 0;
            double wpm = 0,
                accuracy = 0;

            if (performance.RawStats.Count != 0)
            {
                time = performance.RawStats.Sum(stats => stats.Time);
                correctKeypressCount = performance.RawStats.Sum(stats => stats.CorrectKeypressCount);
                keypressCount =
                    performance.RawStats.Sum(stats => stats.CorrectKeypressCount + stats.IncorrectKeypressCount);
                wpm = time == 0 ? 0 : (double) correctKeypressCount / 5 / ((double) time / 1000 / 60);
                accuracy = keypressCount == 0 ? 0 : (correctKeypressCount / (double) keypressCount) * 100;
            }

            var listView = new PerformanceListView
            {
                UserName = performance.Alias.User.UserName,
                AliasName = performance.Alias.Name,
                TextTitle = performance.Section.Text.Title,
                SectionTitle = performance.Section.Title,
                Date = performance.DateOfCompletion,
                Points = performance.Points,
                Time = time,
                Wpm = wpm,
                Accuracy = accuracy,
                // TODO: Compute rank
                Rank = PerformanceRank.Normal.ToString().ToLower()
            };

            return listView;
        }
    }
}