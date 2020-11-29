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

        // GET: api/Performance
        [HttpGet]
        public ActionResult<IEnumerable<PerformanceListView>> GetPerformances()
        {
            var performances = _repository.Get();

            return Ok(performances);
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

            var time = performance.RawStats.Sum(stats => stats.Time);
            var correctKeypressCount = performance.RawStats.Sum(stats => stats.CorrectKeypressCount);
            var keypressCount =
                performance.RawStats.Sum(stats => stats.CorrectKeypressCount + stats.IncorrectKeypressCount);
            var wpm = (double)correctKeypressCount / 5 / ((double)time / 1000 / 60);
            var accuracy = (correctKeypressCount / (double)keypressCount) * 100;

            var listView = new PerformanceListView
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

            return listView;
        }
    }
}