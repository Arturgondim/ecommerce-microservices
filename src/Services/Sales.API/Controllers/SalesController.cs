using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sales.API.Data;
using Sales.API.Models;
using Sales.API.Services;

namespace Sales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesContext _context;
        private readonly RabbitMQProducer _rabbitMQProducer;
    public SalesController(SalesContext context, RabbitMQProducer rabbitMQProducer)
        {
            _context = context;
            _rabbitMQProducer = rabbitMQProducer;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            using var httpClient = new HttpClient();

            var stockUrl = "http://localhost:5029/api/stock/" + order.ProductId;
            var response = await httpClient.GetAsync(stockUrl);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("Produto não encontrado no estoque.");
            }

            var product = await response.Content.ReadFromJsonAsync<ProductDTO>();

            if (product == null || product.StockQuantity < order.Quantity)
            {
                return BadRequest($"Estoque insuficiente. Restam apenas {product?.StockQuantity} unidades.");
            }
            
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var eventMessage = new OrderCreatedEvent(order.ProductId, order.Quantity);
            _rabbitMQProducer.SendMessage(eventMessage);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
    }
}