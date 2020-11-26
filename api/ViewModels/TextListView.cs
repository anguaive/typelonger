namespace api.ViewModels
{
    public class TextListView
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string[] Genres { get; set; }
        public int SectionCount { get; set; }
        public long Length { get; set; }
    }
}