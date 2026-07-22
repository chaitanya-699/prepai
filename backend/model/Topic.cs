using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.model
{
    public class Topic
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public int TechnologyId { get; set; }
        [JsonIgnore]
        public Technology Technology { get; set; } = new Technology();
    }
}
