using backend.service;
using backend.viewmodel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(AuthService authService, JwtService jwtService) : ControllerBase
    {
        private readonly AuthService _authService = authService;
        private readonly JwtService _jwtService = jwtService;

        [HttpPost("login")]
        public IActionResult Login(LoginView model)
        {
            try
            {
                var result = _authService.Login(model);
                //generate Jwt token
                Response.Cookies.Append("jwt", result.Token!, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(new UserDto(result.Id, result.Name, result.Email));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        public IActionResult Register(LoginView model)
        {
            try
            {
                var result = _authService.Register(model);
                Response.Cookies.Append("jwt", result.Token!, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(new UserDto(result.Id, result.Name, result.Email));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var user = new UserDto(
                int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0"),
                User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value ?? "",
                User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value ?? ""
            );
            return Ok(user);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "Logged out successfully."
            });
        }
    }
}
