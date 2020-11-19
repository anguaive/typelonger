using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Text
    {
        [Key]
        public long Id { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverURL { get; set; }
        public string ISBN { get; set; }
        public string[] Genres { get; set; }
        public DateTime DateOfUpload { get; set; }

        // Computed values
        public long Length { get; set; }

        // Navigation properties
        public virtual List<Section> Sections { get; set; }
    }
}