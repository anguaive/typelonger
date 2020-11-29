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
    public class SectionController : ControllerBase
    {
        private readonly ISectionRepository _repository;

        public SectionController(ISectionRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Section
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public  ActionResult<IEnumerable<SectionListView>> GetSections()
        {
            var sections = _repository.Get();

            return Ok(sections);
        }

        // GET: api/Section/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDetailsView>> GetSection(long id)
        {
            var section = await _repository.GetById(id);

            if (section == null)
            {
                return NotFound();
            }

            return Ok(section);
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

        public static SectionListView ToListView(this Section section)
        {
            if (section == null)
            {
                return null;
            }

            var listView = new SectionListView
            {
                Id = section.Id,
                Title = section.Title,
                Difficulty = section.Difficulty,
                Length = section.Length,
                TopPerformances = null,
                UserTopPerformance = null
            };

            return listView;
        }
    }
}