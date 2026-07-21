using backend.Data;
using backend.model;
using backend.viewmodel;

namespace backend.repository
{
    public class UserRepo(PrepAiDbContext context)
    {
        private readonly PrepAiDbContext _context = context;

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User? GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
        public List<UserDto> GetAllUsers()
        {
            return _context.Users
                .Select(u => new UserDto(
                    u.Id,
                    u.Name,
                    u.Email
                ))
                .ToList();
        }
    }
}
