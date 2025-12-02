using Microsoft.AspNetCore.Authorization; // <--- Importante
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stock.API.Data;
using Stock.API.Models;

namespace Stock.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly StockContext _context;

        public StockController(StockContext context)
        {
            _context = context;
        }

        // Público
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // Público
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        // Só Admin pode criar
        [HttpPost]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // Só Admin pode atualizar 
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // Só Admin pode deletar
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}