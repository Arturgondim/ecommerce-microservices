using Microsoft.EntityFrameworkCore;
using Stock.API.Data;
using Stock.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddDbContext<StockContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddHostedService<RabbitMQListener>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();    
    app.UseSwaggerUI(); 
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
Stock.API.Data.DbInitializer.Seed(app);

app.Run();