namespace backend.viewmodel
{
    public class GenerateQuizRequest
    {
        public string Technology { get; set; } = string.Empty;
        public List<string> Topics { get; set; } = [];
        public string Difficulty { get; set; } = string.Empty;
        public int QuestionCount { get; set; }

        public string? NotesText { get; set; }
        public string? NotesFileName { get; set; }
    }
}
