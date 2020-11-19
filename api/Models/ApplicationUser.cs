using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    // Add profile data for application users by adding properties to the User class
    public class ApplicationUser : IdentityUser
    {
        public string PictureURL { get; set; }
        [MaxLength(800)]
        public string Biography { get; set; }
        public DateTime DateOfRegistration { get; set; }

        // Navigation properties
        public virtual List<Alias> Aliases { get; set; }
    }
}
