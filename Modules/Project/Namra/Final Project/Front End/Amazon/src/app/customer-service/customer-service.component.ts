import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})
export class CustomerServiceComponent implements OnInit {

  constructor(private router :Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }
  ModalTitle = '';
  ProductHelpFlag = false;
  AmazonCovidFlag = false;
  ShoppingFlag = false;
  ManagePrimeFlag = false;
  PaymentGiftFlag = false;
  DigitalFlag = false;
  ResetFlags() {
    this.ProductHelpFlag = false;
    this.AmazonCovidFlag = false;
    this.ShoppingFlag = false;
    this.ManagePrimeFlag = false;
    this.PaymentGiftFlag = false;
    this.DigitalFlag = false;
  }

  UserPage()
  {
    if(localStorage.getItem("UserName") == '')
    {
      this.router.navigate(["../Login"],{relativeTo :this.route});
    }
    else
    {
      this.router.navigate(["../User"], {relativeTo : this.route});
    }
  }
}
