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
    public class TextController : ControllerBase
    {
        private readonly ITextRepository _repository;

        public TextController(ITextRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Text
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<TextListView>> GetTexts()
        {
            var texts = _repository.Get();

            return Ok(texts);
        }

        // GET: api/Text/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetText(long id)
        {
            var text = await _repository.GetById(id);

            if (text == null)
            {
                return NotFound();
            }

            return Ok(text);
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
