using System;

namespace api.ViewModels
{
    public enum PerformanceRank
    {
        Gold,
        Silver,
        Bronze,
        Normal
    }

    public class PerformanceDetailsView
    {
        public string Username { get; set; }
        public string AliasName { get; set; }
        public string TextTitle { get; set; }
        public string SectionTitle { get; set; }
        public DateTime Date { get; set; }
        public int Points { get; set; }
        public long Time { get; set; }
        public double Wpm { get; set; }
        public double Accuracy { get; set; }
        public PerformanceRank Rank { get; set; }
    }
}