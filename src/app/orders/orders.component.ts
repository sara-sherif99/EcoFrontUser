import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any = [];
  user: any;
  constructor(public dialog: MatDialog, private http: HttpClient, private myService: ProductService) { }
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.http.get<any>(`https://eco-back-9qg1.onrender.com/order/user/${this.user._id}`).subscribe(
      (response) => {
        this.orders = response;
        this.orders?.forEach((el: any) => {
          el.productIds?.forEach((product: any) => {
            this.myService.getProductByID(product.productId).subscribe(
              (response) => {
                product.product = response;
              },
              (error) => { }
            )
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Open(product: any) {
    const dialogRef = this.dialog.open(SingleProductComponent, {
      panelClass: 'product-dialog',
      data: product
    });
  }
  Remove(id: any) {
    console.log(id)
    this.http.delete<any>(`https://eco-back-9qg1.onrender.com/order/${id}`).subscribe(
      (response) => {
      },
      (error) => {
        console.log(error);
      }
    );
    this.onRefresh();
  }
}
