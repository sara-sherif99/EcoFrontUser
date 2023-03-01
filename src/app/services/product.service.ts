import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private myClient: HttpClient) { }
  private productURL = "https://eco-back-9qg1.onrender.com/product";

  //Methods

  // 1)Get All product
  getAllProducts() {
    return this.myClient.get(this.productURL);
  }

  // 2)Get Product By ID
  getProductByID(id: any) {
    return this.myClient.get(`${this.productURL}/${id}`);
  }


}
