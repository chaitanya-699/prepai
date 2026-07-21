using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class PrepAiDbContext(DbContextOptions<PrepAiDbContext> options) : DbContext(options)
    {
        public DbSet<backend.model.User> Users { get; set; }
    }
}
