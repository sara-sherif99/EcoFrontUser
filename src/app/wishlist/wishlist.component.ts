import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../services/navbar.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(private productService: ProductService,
    private userService: UserService, private http: HttpClient, public dialog: MatDialog,
    private nav: NavbarService) { }
  products: any = [];
  user: any;
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    var arr: any = [];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.products = this.user.wishlist?.forEach((ele: any) => {

      this.productService.getProductByID(ele).subscribe(
        {

          next: (res: any) => {
            console.log(this.user.cart?.find((el: any) => el.productId == res._id));
            if (ele) {
              if (this.user.cart.find((el: any) => el.productId == res._id)) { res.inCart = true }
              else { res.inCart = false };
              arr.push(res);
            }
          }
          , error(err) { console.log(err) }
        });
    });
    this.products = arr;
  }
  Remove(id: any) {
    this.userService.removeFromWishList(this.user._id, id).subscribe(
      {
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.nav.wishlist -= 1;
          this.onRefresh();
        },
        error(err) { console.log(err) }
      }
    );
  }
  AddToCart(id: any) {
    this.nav.cart += 1;
    this.userService.addToCart(this.user._id, id, 1).subscribe(
      {
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.onRefresh();
        },
        error(err) { console.log(err) }
      }
    );
  }
  Open(product: any) {
    const dialogRef = this.dialog.open(SingleProductComponent, {
      panelClass: 'product-dialog',
      data: product
    });
  }
}
