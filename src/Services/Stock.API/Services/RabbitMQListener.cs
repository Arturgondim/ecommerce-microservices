using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Stock.API.Data;
using Stock.API.Models;

namespace Stock.API.Services
{
    public class RabbitMQListener : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public RabbitMQListener(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.QueueDeclare(queue: "order-created-queue",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                
                Console.WriteLine($" [x] Recebida nova venda: {message}");
                await UpdateStockAsync(message);
            };

            channel.BasicConsume(queue: "order-created-queue",
                                 autoAck: true,
                                 consumer: consumer);

            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000, stoppingToken);
            }
        }

        private async Task UpdateStockAsync(string message)
        {
            try 
            {
                var orderCreatedEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(message);
                using (var scope = _scopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<StockContext>();

                    var product = await dbContext.Products.FindAsync(orderCreatedEvent.ProductId);

                    if (product != null)
                    {
                        product.StockQuantity -= orderCreatedEvent.Quantity;
                        await dbContext.SaveChangesAsync();
                        Console.WriteLine($" [V] Estoque atualizado! Produto {product.Id} agora tem {product.StockQuantity} unidades.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($" [Erro] Falha ao processar mensagem: {ex.Message}");
            }
        }
    }
}