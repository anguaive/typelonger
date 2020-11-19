using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Section
    {
        [Key]
        public long Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public int Difficulty { get; set; }

        // Computed values
        public int Length { get; set; }

        // Foreign keys
        public long TextId { get; set; }

        // Navigation properties
        public Text Text { get; set; }
        public List<Performance> Performances { get; set; }
    }
}