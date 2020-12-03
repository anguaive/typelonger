using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Alias
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }
        public DateTime DateOfCreation { get; set; }

        // Computed values
        public int Points { get; set; }
        public double Wpm { get; set; }
        public double Accuracy { get; set; }
        public long Time { get; set; }
        public int Rank { get; set; }

        // Foreign keys
        public string UserId { get; set; }

        // Navigation properties
        public virtual ApplicationUser User { get; set; }
        public virtual List<Performance> Performances { get; set; }

    }
}