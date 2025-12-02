using Identity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Identity.API.Data
{
    public static class IdentityDbInitializer
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<IdentityContext>();

                context.Database.Migrate();

                if (context.Users.Any())
                {
                    return;
                }

                Console.WriteLine("--> Criando Usuário ADMIN e Cliente Padrão...");

                var users = new List<User>()
                {
                    new User 
                    { 
                        Name = "Admin Flamengo",
                        Email = "admin@flamengo.com",
                        Password = "Admin@1234", 
                        Role = "Admin", 
                        CPF = "000.000.000-00",
                        PhoneNumber = "99999999999",
                        ZipCode = "20550013",
                        Street = "Av. Maracanã",
                        Number = "100",
                        Neighborhood = "Maracanã",
                        City = "Rio de Janeiro",
                        State = "RJ"
                    },
                    
                    new User 
                    { 
                        Name = "Torcedor",
                        Email = "torcedor@flamengo.com",
                        Password = "Torcedor@1234",
                        Role = "Customer",
                        CPF = "111.111.111-11",
                        PhoneNumber = "88888888888",
                        ZipCode = "22450000",
                        Street = "Rua Gávea",
                        Number = "10",
                        Neighborhood = "Gávea",
                        City = "Rio de Janeiro",
                        State = "RJ"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}