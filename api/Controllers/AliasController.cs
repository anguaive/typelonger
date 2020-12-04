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
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AliasController : ControllerBase
    {
        private readonly IAliasRepository _repository;

        public AliasController(IAliasRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<AliasListView>> GetAliases()
        {
            var aliases = _repository.Get();

            return Ok(aliases);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Alias>> GetById(long id)
        {
            var alias = await _repository.GetById(id);

            if (alias == null)
            {
                return NotFound();
            }

            return Ok(alias);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AliasDetailsView>> Post([FromBody] NewAlias newAlias)
        {
            var username = User.Identity.Name;

            var dbAlias = await _repository.Post(username, newAlias.AliasName);
            if (dbAlias == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetById), new {id = dbAlias.Id}, dbAlias);
        }
}

    internal static class AliasControllerExtensions
    {
        public static AliasDetailsView ToDetailsView(this Alias alias)
        {
            if (alias == null)
            {
                return null;
            }

            var detailsView = new AliasDetailsView
            {
                Id = alias.Id,
                Name = alias.Name,
                DateOfCreation = alias.DateOfCreation,
                Points = alias.Points,
                Time = alias.Time,
                Wpm = alias.Wpm,
                Accuracy = alias.Accuracy,
                Rank = alias.Rank,
            };

            if (alias.Performances.Count == 0) return detailsView;

            var topPerformancesQuery = from p in alias.Performances
                    .OrderByDescending(p => p.Points)
                    .Take(10)
                select p;

            var recentPerformancesQuery = from p in alias.Performances
                    .OrderByDescending(p => p.DateOfCompletion)
                    .Take(10)
                select p;

            var topPerformances = topPerformancesQuery.Select(perf => perf.ToListView()).ToList();
            var recentPerformances = recentPerformancesQuery.Select(perf => perf.ToListView()).ToList();

            detailsView.TopPerformances = topPerformances;
            detailsView.RecentPerformances = recentPerformances;

            return detailsView;
        }

        public static AliasListView ToListViewModel(this Alias alias)
        {
            if (alias == null)
            {
                return null;
            }

            var listView = new AliasListView
            {
                Name = alias.Name,
                Username = alias.User.UserName,
                Points = alias.Points,
                Time = alias.Time,
                Wpm = alias.Wpm,
                Accuracy = alias.Accuracy,
                Rank = alias.Rank
            };

            return listView;
        }
    }
}