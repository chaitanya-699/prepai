using backend.model;
using Microsoft.AspNetCore.Identity;

namespace backend.service;

public class PasswordService
{
    private static readonly PasswordHasher<User> _passwordHasher = new();

    public string HashPassword(User user, string password)
    {
        return _passwordHasher.HashPassword(user, password);
    }

    public bool VerifyPassword(User user, string password, string passwordHash)
    {
        return _passwordHasher.VerifyHashedPassword(
            user,
            passwordHash,
            password
        ) == PasswordVerificationResult.Success;
    }
}
