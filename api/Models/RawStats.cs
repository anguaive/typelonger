using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class RawStats
    {
        [Key]
        public long Id { get; set; }

        public long Time { get; set; }
        public int CorrectKeypressCount { get; set; }
        public int IncorrectKeypressCount { get; set; }

        // Foreign keys
        public long PerformanceId { get; set; }

        // Navigation properties
        public Performance Performance { get; set; }
    }
}