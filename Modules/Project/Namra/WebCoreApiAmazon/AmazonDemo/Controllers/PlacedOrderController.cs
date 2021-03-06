﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmazonDemo.Authenticate;
using AmazonDemo.Models;
using AmazonDemo.Models.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AmazonDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlacedOrderController : ControllerBase
    {
        private readonly AmazonContext context;
        private readonly IPlacedOrder placedOrder;
        public PlacedOrderController(AmazonContext _context, IPlacedOrder placed)
        {
            this.context = _context;
            this.placedOrder = placed;
        }

        [HttpGet]
        public IEnumerable<PlacedOrder> GetAll()
        {
            return this.placedOrder.GetAll();
        }

        [HttpGet("{placedorderid}")]
        public PlacedOrder GetById(int placedorderid)
        {
            return placedOrder.Find(s=> s.PlacedOrderId == placedorderid).First();
        }

        [HttpGet("{UserId}")]
        public IEnumerable<PlacedOrder> GetOrderByUserId(int UserId)
        {
            return placedOrder.Find(s => s.UserId == UserId);
        }

        [HttpGet("{OrderId}")]
        public string Any(int OrderID)
        {
            return placedOrder.Any(s => s.PlacedOrderId == OrderID) ? $"Order for order id {OrderID} is found..." : $"Order for order id {OrderID} is not found...";
        }

        [HttpGet]
        public bool Any()
        {
            return placedOrder.Any();
        }

        [HttpPost]
        public string Create(Order od)
        {

            PlacedOrder placed = new PlacedOrder();
            placed.UserId = od.UserId;
            placed.ProductId = od.ProductId;
            placed.Bill = od.Bill;
            placed.PlacedStatus = "Not Delivered";
            placed.Quantity = od.Quantity;
            placed.PlacedDate = DateTime.Now;
            placedOrder.Create(placed);
            PlacedOrder lastOrder = context.PlacedOrders.ToList().Last();

            return $"Your placed order id is {lastOrder.PlacedOrderId}...";
        }

        [HttpPut("{id}/{status}")]
        public string Update(int id, String status)
        {
            if (placedOrder.Any(s => s.PlacedOrderId == id))
            {
                PlacedOrder placed = placedOrder.Find(s=> s.PlacedOrderId == id).First();
                placed.PlacedStatus = status;
                context.SaveChanges();
                return $"status for order id : {id} is set to {status}";
            }
            else
                return $"There is no such order for these order id : {id}";
        }
    }
}
