import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../Models/City';
import { Seller, SellerAddress, SellerDeliverable } from '../Models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerAddressService {

  URL : string = 'https://localhost:44368/api/';
  constructor(private http : HttpClient) { }

  GetSellerAddressBySellerId(id : number) : Observable<SellerAddress[]>
  {
    return this.http.get<SellerAddress[]>(this.URL+"SellerAddress/GetById/"+id);
  }
  CreateSellerAddress( sl : SellerAddress) : Observable<boolean>
  {
    return this.http.post<boolean>(this.URL+"SellerAddress/Create",sl);
  }
  UpdateSellerAddress(sl : SellerAddress) : Observable<boolean>
  {
    return this.http.put<boolean>(this.URL+"SellerAddress/Update",sl);
  }
  DeleteSellerAddress(id : number) : Observable<boolean>
  {
    return this.http.delete<boolean>(this.URL+"SellerAddress/Delete/"+id)
  }

  //Seller deliverable

  SellerDeliverableById(id : number) : Observable<City[]>
  {
    return this.http.get<City[]>(this.URL+"SellerDeliverable/GetCitiesBySeller/"+id);
  }
  GetSellerDeliverableBySellerId(id : number) : Observable<SellerDeliverable[]>
  {
    return this.http.get<SellerDeliverable[]>(this.URL+"SellerDeliverable/GetBySellerId/"+id);
  }
  CreateSellerDeliverable(sl : SellerDeliverable) : Observable<boolean>
  {
    return this.http.post<boolean>(this.URL+"SellerDeliverable/Create",sl);
  }
  DeleteSellerDeliverable(id : number) : Observable<boolean>
  {
    return this.http.delete<boolean>(this.URL+"SellerDeliverable/Delete/"+id);
  }

}
