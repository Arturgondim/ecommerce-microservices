using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Models
{
    public class OrderCreatedEvent
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public OrderCreatedEvent(int productId, int quantity)
        {
            ProductId = productId;
            Quantity = quantity;
        }
    }
}