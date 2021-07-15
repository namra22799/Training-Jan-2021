import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/Models/Seller';
import { SellerService } from 'src/app/Services/seller.service';

@Component({
  selector: 'app-admin-seller',
  templateUrl: './admin-seller.component.html',
  styleUrls: ['./admin-seller.component.css']
})
export class AdminSellerComponent implements OnInit {

  constructor(private fb : FormBuilder,private sellerService : SellerService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.check();
    this.search();
    this.SellerForm();
  }
  sellerForm = new FormGroup({});
  check()
  {
    if(localStorage.getItem("Admin")=='')
    {
      this.router.navigate(['./Admin']);
    }
  }

  seller : Seller = {
    sellerCompanyName : '',
    sellerContactNo : '',
    sellerEmail : '',
    sellerName : ''
  }

  SellerForm()
  {
    this.sellerForm = this.fb.group({
      fSellerName : ['', Validators.compose([Validators.required])],
      fSellerCompanyName : ['', Validators.compose([Validators.required])],
      fSellerContactNo : ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern("^[+][0-9][0-9][1-9][0-9]*$")])],
      fSellerEmail : ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]*@[a-z]+[.][a-z]+$")])]
    });
  }
  ResetSeller()
  {
    this.seller = {
      sellerCompanyName : '',
      sellerContactNo : '',
      sellerEmail : '',
      sellerName : ''
    }
  }
  get fSellerName()
  {
    return this.sellerForm.get('fSellerName') as FormControl;
  }
  get fSellerCompanyName()
  {
    return this.sellerForm.get('fSellerCompanyName') as FormControl;
  }
  get fSellerContactNo()
  {
    return this.sellerForm.get('fSellerContactNo') as FormControl;
  }
  get fSellerEmail()
  {
    return this.sellerForm.get('fSellerEmail') as FormControl;
  }
  searchName : string = '';
  searchSet = '';
  sellers : Seller[] = [];
  SearchSet(name : string)
  {
    this.searchName = name;
  }
  search(){
    if(this.searchSet == '')
    {
      this.sellerService.GetAllSellers().subscribe(data=>{
        this.sellers = data;
      });
    }
    else
    {
      if(this.searchName == 'Seller')
      {
        this.sellerService.GetSellerBySellerName(this.searchSet).subscribe(data=>{
          this.sellers = data;
        });
      }
      else if(this.searchName == 'Company')
      {
        this.sellerService.GetSellerByCompanyName(this.searchSet).subscribe(data=>{
          this.sellers = data;
        });
      }
      else
      {
        this.sellerService.GetSellerBySellerName(this.searchSet).subscribe(data=>{
          this.sellers = data;
        });
      }
    }
  }
  SellerInfo(id : number | undefined)
  {
    this.router.navigate(['./',id as number],{relativeTo:this.route});
  }

  AddSeller()
  {
    this.sellerService.CreateSeller(this.seller).subscribe(data=>{
      if(data == 0)
      {
        alert("Not Added, please check it once...");
      }
      else
      {
        alert("Added and id is "+data);
        this.ResetSeller();
        this.search();
      }
    });
  }
  
}
