using System.ComponentModel.DataAnnotations;

namespace api.ViewModels
{
    public class NewUser
    {
        [Required]
        [MinLength(1)]
        [MaxLength(32)]
        [RegularExpression(@"[a-zA-Z0-9_]*")]
        public string Username { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(32)]
        [RegularExpression(@"[a-zA-Z0-9_]*")]
        public string Alias { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(48)]
        public string Password { get; set; }
    }
}