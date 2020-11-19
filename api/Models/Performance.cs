using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Performance
    {
        [Key]
        public long Id { get; set; }

        public int Points { get; set; }
        public string ReplayData { get; set; }
        public DateTime DateOfCompletion { get; set; }

        // Foreign keys
        public long AliasId { get; set; }
        public long SectionId { get; set; }

        // Navigation properties
        public virtual Alias Alias { get; set; }
        public virtual Section Section { get; set; }
        public virtual List<RawStats> RawStats { get; set; }
    }
}