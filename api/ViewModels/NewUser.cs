using System.ComponentModel.DataAnnotations;

namespace api.ViewModels
{
    public class NewUser
    {
        [Required]
        // TODO: Additional username validation
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        // TODO: Additional password validation
        public string Password { get; set; }
    }
}