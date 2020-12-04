using System;
using System.Collections.Generic;
using api.Models;

namespace api.ViewModels
{
    public class NewPerformance
    {
        public long SectionId { get; set; }
        public List<RawStats> SegmentStats { get; set; }
    }
}