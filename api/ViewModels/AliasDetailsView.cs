using System;

namespace api.ViewModels
{
    public class AliasDetailsView
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfCreation { get; set; }

        // Computed values
        public int Points { get; set; }
        public double Wpm { get; set; }
        public double Accuracy { get; set; }
        public long Time { get; set; }
    }
}