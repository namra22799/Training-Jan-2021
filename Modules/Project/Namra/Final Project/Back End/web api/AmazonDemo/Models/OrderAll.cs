﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmazonDemo.Models
{
    public class OrderAll
    {
        public long OrderId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime? OrderedDate { get; set; }
        public int Bill { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
        public int SellerId { get; set; }
    }
}
