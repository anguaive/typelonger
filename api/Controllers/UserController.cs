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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }

        // GET: api/User
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<ViewModels.User>> Get()
        {
            var users = _repository.Get();

            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{name}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ViewModels.User>> GetByName(string name)
        {
            var user = await _repository.GetByName(name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPatch("{name}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Patch(string name,  [FromBody] ViewModels.User user)
        {
            var result = await _repository.Patch(name, user);
            return result ? (IActionResult) NoContent() : NotFound();
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