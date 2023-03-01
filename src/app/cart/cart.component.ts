import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NavbarService } from '../services/navbar.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('closebutton') closebutton!: ElementRef;
  constructor(private productService: ProductService, public dialog: MatDialog, public myService: UserService,
    private nav: NavbarService, private http: HttpClient, private userService: UserService) { }

  products: any;
  user: any;
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    var arr: any = [];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.products = this.user.cart?.forEach((ele: any) => {
      this.productService.getProductByID(ele.productId).subscribe(
        {
          next: (res: any) => {
            if (ele) {
              res.amount = ele.amount;
              arr.push(res);
            }
          }
          , error(err) { console.log(err) }
        });
    });
    this.products = arr;
  }
  removeItem(id: any) {
    this.nav.cart -= 1;
    this.myService.removeFromCart(this.user._id, id).subscribe(
      {
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.onRefresh();
        },
        error(err) { console.log(err) }
      }
    );

  }

  get geTotal() {
    let total = 0;
    this.products.forEach((element: any) => {
      total += ((element.price * (1 - element.sale / 100)) * element.amount);
    });
    return total;
  }
  get allTotal() {
    let alltotal = 0;
    let shipping = 45;
    return alltotal = shipping + this.geTotal;
  }
  increase(_id: any) {

    this.products.forEach((element: any) => {
      if (element._id == _id && element.amount <= element.quantity) { element.amount++; }
      console.log()
    })
  }
  decrease(_id: any) {
    this.products.forEach((element: any) => {
      if (element._id == _id && element.amount !== 0) { element.amount--; }
    })
  }

  Open(product: any) {
    const dialogRef = this.dialog.open(SingleProductComponent, {
      panelClass: 'product-dialog',
      data: product
    });
  }

  Checkout() {
    this.http.post<any>('https://eco-back-9qg1.onrender.com/order', { productIds: this.user.cart, userId: this.user._id, orderDate: new Date(), totalPrice: this.allTotal }).subscribe(
      (response) => {
        console.log(response);
        this.nav.cart = 0;
        this.myService.removeFromCart(this.user._id, "all").subscribe(
          {
            next: (res) => {
              localStorage.setItem('user', JSON.stringify(res.user));
              this.onRefresh();
            },
            error(err) { console.log(err) }
          }
        );

        this.closebutton.nativeElement.click();
      },
      (error) => {
      }
    );
  }

}

