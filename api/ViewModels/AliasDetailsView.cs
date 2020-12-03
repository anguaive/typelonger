using System;
using System.Collections.Generic;
using api.Models;

namespace api.ViewModels
{
    public class AliasDetailsView
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfCreation { get; set; }
        public int Points { get; set; }
        public double Wpm { get; set; }
        public double Accuracy { get; set; }
        public long Time { get; set; }
        public int Rank { get; set; }
        public List<PerformanceListView> TopPerformances { get; set; }
        public List<PerformanceListView> RecentPerformances { get; set; }
    }
}