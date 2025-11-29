using System.Text;
using Identity.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// 1. Adicionar serviços ao container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Swagger para documentação

// 2. Configurar Banco de Dados (IdentityContext)
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Configurar Autenticação JWT
// Pega a chave secreta do appsettings.json
var jwtKey = builder.Configuration["Jwt:Key"];

// Proteção extra: Garante que a chave existe antes de continuar
if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("A chave JWT (Jwt:Key) não foi encontrada no appsettings.json!");
}

var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Em produção deve ser true
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,   // Simplificado para dev (pode ativar depois)
        ValidateAudience = false  // Simplificado para dev (pode ativar depois)
    };
});

var app = builder.Build();

// 4. Configurar o pipeline de requisição HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// A ordem aqui é CRUCIAL:
app.UseAuthentication(); // 1º: Quem é você? (Lê o Token)
app.UseAuthorization();  // 2º: Você tem permissão? (Libera acesso)

app.MapControllers();

app.Run();