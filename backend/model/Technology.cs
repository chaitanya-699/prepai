using System.ComponentModel.DataAnnotations;

namespace backend.model
{
    public class Technology
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public ICollection<Topic> Topics { get; set; } = [];

    }
}
