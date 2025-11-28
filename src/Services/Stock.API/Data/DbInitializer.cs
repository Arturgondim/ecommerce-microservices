using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stock.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Stock.API.Data
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<StockContext>();

                context.Database.Migrate();

                Console.WriteLine("--> Criando produtos do Mengão...");
                if (context.Products.Any())
                {
                    Console.WriteLine("--> Banco já contém dados.");
                    return;
                }
                var produtos = new List<Product>()
                {
                    new Product 
                    { 
                        Name = "Camisa Flamengo I 2025", 
                        Description = "Manto Sagrado Rubro-Negro Oficial", 
                        Price = 349.90m, 
                        StockQuantity = 100, 
                        ImageUrl = "https://images.tcdn.com.br/img/img_prod/766258/camisa_flamengo_i_24_25_torcedor_adidas_masculina_6653_1_18f5370d0696956270b2016503b41249.jpg"
                    },
                    new Product 
                    { 
                        Name = "Ingresso Maracanã - Norte", 
                        Description = "Final da Libertadores", 
                        Price = 150.00m, 
                        StockQuantity = 500, 
                        ImageUrl = "https://ingressos.flamengo.com.br/images/setores/norte.png"
                    },
                    new Product 
                    { 
                        Name = "Boné CRF Aba Reta", 
                        Description = "Preto com escudo bordado", 
                        Price = 89.90m, 
                        StockQuantity = 50, 
                        ImageUrl = "https://static.netshoes.com.br/produtos/bone-flamengo-aba-reta-adidas-snapback/06/COL-7564-006/COL-7564-006_zoom1.jpg"
                    }
                };

                context.Products.AddRange(produtos);
                context.SaveChanges();

            }
        }
        
    }
}