import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacedOrder } from '../Models/ClassOrder';
import { User } from '../Models/User';
import { Product } from '../Product';
import { LoginService } from '../Services/login.service';
import { PlaceOrderService } from '../Services/place-order.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService : UserService, private placedService : PlaceOrderService,private router : Router, private route : ActivatedRoute, private loginService : LoginService) { }

  ngOnInit(): void {
    this.loginService.GetUserDataByLogin(localStorage.getItem("UserName") as string).subscribe(data=>{
      this.user = data;
    });
    this.GetPlacedOrder();
  }

  user : User = {userId:0,userFirstName:'', userMiddleName :'', userLastName : '', userContactNo : '', userEmail : '', userLogIn : '', userPassword : ''}
  LogOut(){
    this.loginService.ResetLogin();
    this.router.navigate(['../Login'], {relativeTo:this.route});
  }

  products : Product[] = [];
  placedProducts : PlacedOrder[] = [];
  placedProductDisplay : PlacedOrder[] = [];
  flagOrders = false;
  GetPlacedOrder()
  {
    this.loginService.GetUserDataByLogin(localStorage.getItem("UserName") as string).subscribe(data=>
      {
        this.user = data;
        this.placedService.GetPlacedOrderByUser(this.user.userId as number).subscribe(dt=>{
          this.placedProducts = dt;
          // this.placedProducts.forEach(element => {
          //   this.placedProductDisplay.forEach(p => {
          //     if(p.placedOrderId==element.placedOrderId)
          //     {
          //       this.flagOrders = true;
          //     }
          //     else
          //     {
          //       this.flagOrders = false;
          //     }
          //   });
          // });
        });
        this.placedService.GetProductPlacedByUser(this.user.userId as number).subscribe(dt=>{
          this.products = dt;
        });
      });
  }
  Return(id : number | undefined)
  {
    this.placedService.UpdatePlacedOrder(id as number,"Returned").subscribe(data=>{
      if(data==true)
      {
        alert("Product is returned successfully..");
        this.GetPlacedOrder();
      }
      else
      {
        alert("Not returned...");
      }
    });
    
  }
  imgPath(str : string)
  {
    if(str.startsWith('assets'))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  viewOrder(id : number)
  {
    alert(id);
  }
}
