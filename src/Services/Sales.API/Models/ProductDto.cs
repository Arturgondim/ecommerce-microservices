using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Models
{
    // Essa classe serve apenas para ler a resposta que vem da API de Estoque
    public class ProductDTO
    {
        public int Id { get; set; }
        public int StockQuantity { get; set; }
    }
}