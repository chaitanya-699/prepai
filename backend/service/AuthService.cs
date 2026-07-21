using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.model;
using backend.repository;
using backend.viewmodel;

namespace backend.service
{
    public class AuthService(UserRepo userRepo, PasswordService passwordService, JwtService jwtService)
    {
        private readonly UserRepo _userRepo = userRepo;
        private readonly PasswordService _passwordService = passwordService;
        private readonly JwtService _jwtService = jwtService;

        public UserView Login(LoginView model)
        {
            var user = _userRepo.GetUserByEmail(model.Email) ?? throw new Exception("User not found");

            if (!_passwordService.VerifyPassword(user, model.Password, user.PasswordHash))
            {
                throw new Exception("Invalid password");
            }
            var token = _jwtService.GenerateToken(user);
            return new UserView(user, token);
        }

        public UserView LoginToken(string token)
        {
            var principal = _jwtService.ValidateToken(token) ?? throw new Exception("Invalid token");
            var userid = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("Invalid token");
            var user = _userRepo.GetUserById(int.Parse(userid)) ?? throw new Exception("User not found");
            return new UserView(user, token);
        }

        public UserView Register(LoginView model)
        {
            var existingUser = _userRepo.GetUserByEmail(model.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exists");
            }

            var user = new User
            {
                Email = model.Email,
                Name = model.Email.Split('@')[0],
            };
            user.PasswordHash = _passwordService.HashPassword(user, model.Password);
            _userRepo.AddUser(user);
            var token = _jwtService.GenerateToken(user);
            return new UserView(user, token: token);
        }
    }
}
