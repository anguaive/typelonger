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
    public class AliasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AliasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Alias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AliasListView>>> GetAliases()
        {
            return NotFound();
        }

        // GET: api/Alias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alias>> GetAlias(long id)
        {
            var @alias = await _context.Aliases.FindAsync(id);

            if (@alias == null)
            {
                return NotFound();
            }

            return @alias;
        }

        // PUT: api/Alias/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlias(long id, Alias @alias)
        {
            if (id != @alias.Id)
            {
                return BadRequest();
            }

            _context.Entry(@alias).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AliasExists(id))
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

        // POST: api/Alias
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Alias>> PostAlias(Alias @alias)
        {
            _context.Aliases.Add(@alias);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlias", new {id = @alias.Id}, @alias);
        }


        private bool AliasExists(long id)
        {
            return _context.Aliases.Any(e => e.Id == id);
        }
    }

    internal static class AliasControllerExtensions
    {
        public static AliasDetailsView ToProfileViewModel(this Alias alias)
        {
            if (alias == null)
            {
                return null;
            }

            var profileView = new AliasDetailsView
            {
                Name = alias.Name,
                DateOfCreation = alias.DateOfCreation,
                Points = alias.Points,
                Time = alias.Time,
                Wpm = alias.Wpm,
                Accuracy = alias.Accuracy
            };

            return profileView;
        }
    }
}