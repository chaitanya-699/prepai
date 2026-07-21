using backend.viewmodel;
using backend.repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController(UserRepo userRepo) : ControllerBase
    {
        private readonly UserRepo _userRepo = userRepo;

        [HttpGet("/users")]
        public IEnumerable<UserDto> GetUsers()
        {
            return _userRepo.GetAllUsers();
        }
        [HttpGet("/")]
        public string Home()
        {
            return "Hello Home!";
        }
    }
}
