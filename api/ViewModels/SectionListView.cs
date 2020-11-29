using System.Collections.Generic;
using api.Models;

namespace api.ViewModels
{
    public class SectionListView
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Difficulty { get; set; }
        public int Length { get; set; }
        public virtual List<Performance> TopPerformances { get; set; }
        public Performance UserTopPerformance { get; set; }
    }
}