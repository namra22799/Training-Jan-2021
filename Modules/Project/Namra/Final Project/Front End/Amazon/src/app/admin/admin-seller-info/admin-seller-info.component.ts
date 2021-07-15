import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/Models/City';
import { Seller, SellerAddress, SellerDeliverable, SellerProduct } from 'src/app/Models/Seller';
import { Product } from 'src/app/Product';
import { CityService } from 'src/app/Services/city.service';
import { DemoService } from 'src/app/Services/demo.service';
import { SellerAddressService } from 'src/app/Services/seller-address.service';
import { SellerProductService } from 'src/app/Services/seller-product.service';
import { SellerService } from 'src/app/Services/seller.service';

@Component({
  selector: 'app-admin-seller-info',
  templateUrl: './admin-seller-info.component.html',
  styleUrls: ['./admin-seller-info.component.css']
})
export class AdminSellerInfoComponent implements OnInit {

  constructor(private router : Router,private demoService: DemoService, private cityService: CityService, private sellerProductService: SellerProductService, private route: ActivatedRoute, private sellerAddressService: SellerAddressService, private sellerService: SellerService, private fb: FormBuilder) {
    this.SellerForm();
  }

  check()
  {
    if(localStorage.getItem("Admin")=='')
    {
      this.router.navigate(['./Admin']);
    }
  }
  imgPath(str: string) {
    if (str.startsWith('assets')) {
      return true;
    }
    else {
      return false;
    }
  }
  seller: Seller =
    {
      sellerId: 0,
      sellerCompanyName: '',
      sellerContactNo: '',
      sellerEmail: '',
      sellerName: ''
    }
  sellerAddresses: SellerAddress[] = [];
  sellerAddress: SellerAddress = {
    sellerAddress1: '',
    sellerCityId: 0,
    sellerId: 0
  }
  sellerAddressCityName = '';
  AddressCities: City[] = [];
  sellerForm = new FormGroup({});
  sellerAddressForm = new FormGroup({});
  Id: number = 0;
  products: Product[] = [];
  ngOnInit(): void {
    this.check();
    this.SellerDataById();
    this.GetAddress();
    this.GetSellerProducts();
    this.GetSellerDeliverable();
    this.SellerAddressForm();
    this.demoService.getData().subscribe(data => {
      this.ProductsData = data;
    });
  }

  SellerForm() {
    this.sellerForm = this.fb.group({
      FSellerName: [''],
      FSellerCompanyName: [''],
      FSellerContactNo: [''],
      FSellerEmail: ['']
    });
  }
  SellerAddressForm() {
    this.sellerAddressForm = this.fb.group({
      fSellerAddress1: ['', Validators.compose([Validators.required])],
      fSellerCityId: ['', Validators.compose([Validators.required])],
    });
  }
  get fSellerName() {
    return this.sellerForm.get('FSellerName') as FormControl;
  }
  get fSellerCompanyName() {
    return this.sellerForm.get('FSellerCompanyName') as FormControl;
  }
  get fSellerContactNo() {
    return this.sellerForm.get('FSellerContactNo') as FormControl;
  }
  get fSellerEmail() {
    return this.sellerForm.get('FSellerEmail') as FormControl;
  }

  get fSellerAddress1() {
    return this.sellerAddressForm.get('fSellerAddress1') as FormControl;
  }
  get fSellerCityId() {
    return this.sellerAddressForm.get('fSellerCityId') as FormControl;
  }

  SellerDataById() {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.sellerService.GetSellerById(params['id']).subscribe(data => {
        this.seller = data;
      })
    });
  }

  DeleteSeller()
  {
    this.route.params.subscribe(params=>{
      this.sellerService.DeleteSeller(params['id']).subscribe(data=>{
        if(data == true)
        {
          this.router.navigate(['../'],{relativeTo : this.route});
        }
        else
        {
          alert("Not deleted...");
        }
      });
    });
  }
  CityAddress: City[] = [];
  ProductsData: Product[] = [];
  GetAddress() {
    this.route.params.subscribe(params => {
      this.sellerAddressService.GetSellerAddressBySellerId(params['id']).subscribe(data => {
        this.sellerAddresses = data;
        for (let index = 0; index < this.sellerAddresses.length; index++) {
          this.cityService.GetCityById(this.sellerAddresses[index].sellerCityId).subscribe(data => {
            this.CityAddress[index] = data;
          });
        }
      });
    });
    this.cityService.GetAll().subscribe(data => {
      this.AddressCities = data;
    });
  }
  sellerProduct: SellerProduct[] = [];
  GetSellerProducts() {
    this.route.params.subscribe(params => {
      this.sellerProductService.GetProductsSellerById(params['id']).subscribe(dt => {
        this.products = dt;
      });
      this.sellerProductService.GetSellerProductBySeller(params['id']).subscribe(data => {
        this.sellerProduct = data;
      });
    });
  }
  cities: City[] = [];
  deliverableData : SellerDeliverable[] = [];
  AllCities : City[] = [];
  GetSellerDeliverable() {
    this.route.params.subscribe(params => {
      this.sellerAddressService.SellerDeliverableById(params['id']).subscribe(data => {
        this.cities = data;
      });
      this.sellerAddressService.GetSellerDeliverableBySellerId(params['id']).subscribe(data=>{
        this.deliverableData = data;
      });
      this.cityService.GetAll().subscribe(dat=>{
        this.AllCities = dat;
      });
    });
  }
  ResetSeller() {
    this.seller = {
      sellerId: 0,
      sellerCompanyName: '',
      sellerContactNo: '',
      sellerEmail: '',
      sellerName: ''
    }
  }
  UpdateSeller() {
    this.sellerService.UpdateSeller(this.seller).subscribe(data => {
      if (data == true) {
        alert("Updated...");
      }
      else {
        alert("Not updated...");
      }
      this.ResetSeller();
      this.SellerDataById();
    });
  }
  AddImagePath = '';
  SetImagePath() {
    this.demoService.GetProductById(this.productId).subscribe(data => {
      this.AddImagePath = data.imgPath;
    });
  }
  productId = 0;

  SetAddress(l: SellerAddress) {
    this.sellerAddress = l;
    this.cityService.GetCityById(l.sellerCityId).subscribe(data => {
      this.sellerAddressCityName = data.cityName;
    });
  }
  AddressFlag = true;
  ResetAddress() {
    this.sellerAddress = {
      sellerAddress1: '',
      sellerCityId: 0,
      sellerId: 0
    }
    this.sellerAddress.sellerAddressId = undefined;
    this.sellerAddressCityName = '';
  }
  city: City = {
    cityName: '',
    stateId: 0
  }
  UpdateAddress() {

    this.cityService.GetIdByCityName(this.sellerAddressCityName).subscribe(data => {
      this.sellerAddress.sellerCityId = data;
      this.sellerAddressService.UpdateSellerAddress(this.sellerAddress).subscribe(data => {
        if (data == true) {
          alert("Updated...");
        }
        else {
          alert("Not updated...");
        }
        this.ResetAddress();
        this.GetAddress();
      });
    });
  }
  num: number = 0;
  CreateAddress() {
    this.route.params.subscribe(params => {
      this.sellerService.GetSellerById(params['id']).subscribe(data => {
        this.num = data.sellerId as number;
        console.log(this.num)
        this.cityService.GetIdByCityName(this.sellerAddressCityName).subscribe(dat => {
          this.sellerAddress.sellerCityId = dat;
          this.sellerAddress.sellerId = this.num;
          console.log(this.sellerAddress);
          this.sellerAddressService.CreateSellerAddress(this.sellerAddress).subscribe(dt => {
            if (dt == true) {
              alert('Inserted...');
            }
            else {
              alert("Not inserted...");
            }
            this.ResetAddress();
            this.GetAddress();
          });
        });
      })
    })
  }
  DeleteAddress() {
    this.sellerAddressService.DeleteSellerAddress(this.sellerAddress.sellerAddressId as number).subscribe(data => {
      if (data == true) {
        alert("Deleted...");
      }
      else {
        alert("Not deleted...");
      }
      this.ResetAddress();
      this.GetAddress();
    });
  }
  sellerPrc: SellerProduct = {
    sellerId: 0,
    productId: 0
  }
  SelectProduct(id: number) {
    this.sellerPrc.productId = id;
  }
  addSellerProductSellerId = 0;
  CreateSellerProduct() {
    this.route.params.subscribe(params => {
      this.sellerService.GetSellerById(params['id']).subscribe(data => {
        this.addSellerProductSellerId = data.sellerId as number;
        this.sellerPrc.sellerId = this.addSellerProductSellerId;
        this.demoService.GetProductById(this.productId).subscribe(p => {
          this.sellerPrc.productId = p.productId;
          this.sellerProductService.CreateSellerProduct(this.sellerPrc).subscribe(dt => {
            if(dt == true)
            {
              alert("Inserted...");
            }
            else
            {
              alert("Not inserted...");
            }
            this.AddImagePath = '';
            this.productId = 0;
            this.GetSellerProducts();
          });
        });
      });
    });
  }
  sellerProductDelete(id : number | undefined)
  {
    this.sellerProductService.DeleteSellerProduct(id as number).subscribe(data=>{
      if(data==true)
      {
        alert("Deleted...");
      }
      else
      {
        alert("Not deleted...");
      }
      this.GetSellerProducts();
    });
  }
  AddSellerDeliverable : SellerDeliverable ={
    cityId : 0,
    sellerId : 0
  }
  cityAddressId : number = 0 ;
  sellerAddressId : number = 0;
  CreateSellerDeliverable()
  {
    this.route.params.subscribe(params=>{
      this.sellerService.GetSellerById(params['id']).subscribe(data=>{
        this.sellerAddressId = data.sellerId as number;
        this.AddSellerDeliverable.sellerId = this.sellerAddressId;
        this.cityService.GetCityById(this.cityAddressId).subscribe(data=>{
          this.AddSellerDeliverable.cityId = data.cityId as number;
          this.sellerAddressService.CreateSellerDeliverable(this.AddSellerDeliverable).subscribe(dt=>{
            if(dt==true)
            {
              alert("Added...");
              this.GetSellerDeliverable();
              this.cityAddressId = 0;
            }
            else
            {
              alert("Not added...");
            }
          });
        });
      });
    });
  }
  DeleteSellerDeliverable(id : number | undefined)
  {
    this.sellerAddressService.DeleteSellerDeliverable(id as number).subscribe(data=>{
      if(data== true)
      {
        alert('deleted...');
        this.GetSellerDeliverable();
      }
      else
      {
        alert('not deleted...');
      }
    });
  }
}
