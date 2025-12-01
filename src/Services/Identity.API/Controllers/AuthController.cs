using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Identity.API.Data;
using Identity.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Identity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IdentityContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IdentityContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest("Usuário já existe.");

            // Validação básica (opcional)
            if (string.IsNullOrEmpty(user.CPF)) return BadRequest("CPF é obrigatório");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuário criado com sucesso!" });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(User login)
        {
            // Busca usuário
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);

            if (user == null)
                return Unauthorized("Usuário ou senha inválidos.");

            // GERA O TOKEN JWT
            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) 
                return NotFound("E-mail não encontrado.");
            return Ok(new { message = "Se o e-mail existir, enviamos um link de recuperação." });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(2), // Token vale por 2 horas
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}