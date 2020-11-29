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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<ViewModels.User>> GetApplicationUsers()
        {
            List<ViewModels.User> users = new List<ViewModels.User>();

            var query = from appUser in _context.ApplicationUsers
                .AsNoTracking()
                .Include(appUser => appUser.Aliases)

                select appUser;

            foreach (var appUser in query)
            {
                users.Add(appUser.ToView());
            }

            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ViewModels.User>> GetApplicationUser(string id)
        {
            var query = from appUser in _context.ApplicationUsers
                    .AsNoTracking()
                    .Include(appUser => appUser.Aliases)
                    .Where(user => user.Id == id)
                select appUser;

            var applicationUser = await query.SingleOrDefaultAsync();

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser.ToView();
        }

        // PUT: api/User/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(applicationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
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

        private bool ApplicationUserExists(string id)
        {
            return _context.ApplicationUsers.Any(e => e.Id == id);
        }
    }

    internal static class UserControllerExtensions
    {
        public static ViewModels.User ToView(this ApplicationUser applicationUser)
        {
            if (applicationUser == null)
            {
                return null;
            }

            var view = new ViewModels.User
            {
                Name = applicationUser.UserName,
                Biography = applicationUser.Biography,
                PictureURL = applicationUser.PictureURL,
                DateOfRegistration = applicationUser.DateOfRegistration,
                Aliases = applicationUser.Aliases.Select(alias => alias.ToDetailsView()).ToList()
            };

            return view;
        }
    }
}