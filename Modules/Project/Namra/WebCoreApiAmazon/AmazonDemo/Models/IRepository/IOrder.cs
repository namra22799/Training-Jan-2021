﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmazonDemo.Models.IRepository
{
    public interface IOrder : IAmazon<Order>
    {
        string updateOrder(int id, ClassOrder cls);
    }
}
