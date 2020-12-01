using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Alias = api.Models.Alias;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly JwtOptions _jwtOptions;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger _logger;

        public AuthController(IOptions<JwtOptions> jwtOptions, UserManager<ApplicationUser> userManager, ILoggerFactory loggerFactory)
        {
            _jwtOptions = jwtOptions.Value;
            _userManager = userManager;
            _logger = loggerFactory.CreateLogger<AuthController>();
        }

        [AllowAnonymous]
        [HttpGet("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromQuery] string username, [FromQuery] string password)
        {
            var user = await _userManager.FindByNameAsync(username);
            var passwordIsValid = await _userManager.CheckPasswordAsync(user, password);

            if (user == null || !passwordIsValid)
            {
                _logger.LogInformation("Failed login. Invalid username or password.");
                return BadRequest(new
                {
                    error = "The username or password is invalid."
                });
            }

            // Check if the email is confirmed

            // Generate ID token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Issuer,
                expires: DateTime.UtcNow.AddHours(1),
                claims: new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                },
                signingCredentials: signingCredentials
            );

            _logger.LogInformation($"Successful login. Sending ID token for user: (id: {user.Id}, name: {user.UserName}");
            return Ok(new {token = new JwtSecurityTokenHandler().WriteToken(token)});
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Register([FromBody] NewUser newUser)
        {
            // Create new user with the given credentials
            var alias = new Alias {Name = newUser.Alias, DateOfCreation = DateTime.UtcNow};
            var user = new ApplicationUser {UserName = newUser.Username, Email = newUser.Email, DateOfRegistration = DateTime.UtcNow, Aliases = new List<Alias> {alias}};
            var userCreation = await _userManager.CreateAsync(user, newUser.Password);

            if (userCreation.Succeeded)
            {
                // TODO: Send confirmation email
                _logger.LogInformation($"Registered user (id: {user.Id}, name: {user.UserName})");
                return Ok();
            }
            else
            {
                return BadRequest(new {general = userCreation.Errors.Select(err => err.Description)});
            }
        }
    }
}