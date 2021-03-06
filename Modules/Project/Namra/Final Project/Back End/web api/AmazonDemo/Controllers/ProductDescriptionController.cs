﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmazonDemo.Models;
using AmazonDemo.Models.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace AmazonDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductDescriptionController : Controller
    {
        IProduct product;
        IProductDescription productDescription;
        private readonly AmazonContext context;
        public ProductDescriptionController(IProduct product, IProductDescription productDescription, AmazonContext context)
        {
            this.product = product;
            this.productDescription = productDescription;
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<ProductDescription> GetAll()
        {
            return productDescription.GetAll();
        }

        [HttpGet("{Id}")]
        public bool AnyByProductId(int Id)
        {
            return productDescription.Any(s => s.ProductId == Id);
        }

        //Description by product Id
        [HttpGet("{Id}")]
        public ProductDescription GetByProductId(int Id)
        {
           if(productDescription.Any(s=>s.ProductId == Id))
            {
                return productDescription.Find(s => s.ProductId == Id).First();
            }
           else
            {
                ProductDescription description = new ProductDescription();
                description.ProductId = 0;
                description.ExtraDescription = "";
                description.ProductDescription1 = "";
                description.RelatedCategory = "";
                description.ProductDescriptionId = 0;
                return description;
            }
        }

        // Search by extra description return products
        [HttpGet("{Description}")]
        public IEnumerable<ProductDescription> GetByDescription(string Description)
        {
            return productDescription.Find(s => s.ExtraDescription == Description);
        }

        //do it by extra description
        [HttpGet("{Description}")]
        public IEnumerable<Product> GetProductByDescription(string Description)
        {
            IEnumerable<ProductDescription> pd = this.GetByDescription(Description);
            List<Product> products = new List<Product>();
            foreach (var item in pd)
            {
                products.Add(product.Find(s => s.ProductId == item.ProductId).First());
            }
            return products;
        }

        // Get it by related category
        [HttpGet("{RelatedCategory}")]
        public IEnumerable<Product> GetProductByRelatedCategory(string RelatedCategory)
        {
            IEnumerable<ProductDescription> pd = productDescription.Find(s => s.RelatedCategory == RelatedCategory);
            List<Product> products = new List<Product>();
            foreach (var item in pd)
            {
                products.Add(product.Find(s => s.ProductId == item.ProductId).First());
            }
            return products;
        }

        [HttpPost]
        public bool Create([FromBody] ProductDescription prcDescription)
        {
            if(!productDescription.Any(s=>s.ProductId == prcDescription.ProductId))
            {
                productDescription.Create(prcDescription);
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPut]
        public bool Update([FromBody] ProductDescription prc)
        {
            if(productDescription.Any(s=>s.ProductId == prc.ProductId))
            {
                productDescription.Update(prc);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
