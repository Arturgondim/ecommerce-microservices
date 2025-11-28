using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stock.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Stock.API.Data
{
    public class StockContext : DbContext
    {
        public StockContext(DbContextOptions<StockContext> options) : base(options){  }

        public DbSet<Product> Products{ get; set; }
        
    }
}