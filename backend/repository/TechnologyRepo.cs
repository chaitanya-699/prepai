using backend.Data;
using backend.model;
using Microsoft.EntityFrameworkCore;

namespace backend.repository
{
    public class TechnologyRepo(PrepAiDbContext context)
    {

        private readonly PrepAiDbContext _context = context;

        public void AddTechnology(Technology technology)
        {
            _context.Technologies.Add(technology);
            _context.SaveChanges();
        }
        public void AddTopicToTechnology(string name, Topic topic)
        {
            var technology = _context.Technologies.FirstOrDefault(t => t.Name == name);
            if (technology != null)
            {
                technology.Topics.Add(topic);
                _context.SaveChanges();
            }
        }
        public void UpdateTechnology(Technology technology)
        {
            _context.Technologies.Update(technology);
            _context.SaveChanges();
        }
        public Technology? GetTechnologyById(int id)
        {
            return _context.Technologies.FirstOrDefault(t => t.Id == id);
        }
        public List<Technology> GetAllTechnologies()
        {
            return [.. _context.Technologies.Include(t => t.Topics)];
        }
        public List<string> GetAllTechnologyNames()
        {
            return _context.Technologies.Select(t => t.Name).ToList();
        }
        public List<string> GetAllTopicNamesByTechnology(string technologyName)
        {
            var technology = _context.Technologies.Include(t => t.Topics).FirstOrDefault(t => t.Name == technologyName);
            if (technology != null)
            {
                return technology.Topics.Select(topic => topic.Name).ToList();
            }
            return new List<string>();
        }
        public Dictionary<string, int> GetTechologyTopicCounts()
        {
            return _context.Technologies
                .Include(t => t.Topics)
                .ToDictionary(t => t.Name, t => t.Topics.Count);
        }
    }
}
