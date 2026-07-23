using System.Text.Json;
using backend.viewmodel;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        [HttpPost("generate")]
        [Consumes("application/json")]
        public async Task<IActionResult> GenerateQuiz(
            [FromBody] GenerateQuizRequest request)
        {
            // request.Topics is already List<string>

            return Ok(new
            {
                success = true,
                message = "Quiz generated successfully.",
                request
            });
        }
        [HttpPost("generate-with-file")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> GenerateQuizWithFile(
            [FromForm] GenerateQuizFormRequest request)
        {
            System.Console.WriteLine("helllllllllllllooo");
            var topics = request.Topics ?? new List<string>();

            System.Console.WriteLine($"Received request: Technology={request.Technology}, Topics={string.Join(", ", topics)}, Difficulty={request.Difficulty}, QuestionCount={request.QuestionCount}, NotesText={request.NotesText}, NotesFileName={request.NotesFileName}");
            if (request.NotesFile != null)
            {
                using var stream = request.NotesFile.OpenReadStream();
                System.Console.WriteLine($"Received file: {request.NotesFile.FileName}, size: {request.NotesFile.Length} bytes");
                // Read or save file here
            }

            return Ok(new
            {
                success = true,
                message = "Quiz generated successfully.",
                technology = request.Technology,
                topics,
                difficulty = request.Difficulty,
                questionCount = request.QuestionCount,
                notesText = request.NotesText,
                fileName = request.NotesFile?.FileName
            });
        }
    }
}
