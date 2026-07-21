using backend.model;

namespace backend.viewmodel
{
    public class UserView(User user, string token)
    {
        public int Id { get; set; } = user.Id;
        public string Email { get; set; } = user.Email;
        public string Name { get; set; } = user.Name;
        public string? Token { get; set; } = token;
    }
}
