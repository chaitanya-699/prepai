namespace backend.viewmodel
{
    using Microsoft.AspNetCore.Http;

    public class GenerateQuizFormRequest
    {   
        public string Technology { get; set; } = string.Empty;

        public List<string> Topics { get; set; } = new List<string>();

        public string Difficulty { get; set; } = string.Empty;
        public int QuestionCount { get; set; }

        public string? NotesText { get; set; }
        public string? NotesFileName { get; set; }

        public IFormFile? NotesFile { get; set; }
    }
}
