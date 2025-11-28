using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sales.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Sales.API.Data
{
        public class SalesContext : DbContext
    {
        public SalesContext(DbContextOptions<SalesContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
    }
    
}