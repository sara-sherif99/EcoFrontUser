import { Component } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { ProductService } from '../services/product.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SingleProductComponent } from '../single-product/single-product.component';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent {
  selected = '';
  faSync=faSync;
  faShoppingCart=faShoppingCart;
  constructor( private http: HttpClient,public nav:NavbarService,public myService: ProductService,public dialog: MatDialog){}
  products:any;
  x:any;
  items:any=['All'];
  activeIndex=0;
  async ngOnInit() {   
    this.nav.home=false;
    this.nav.about=false;
    this.nav.shop=true;
    await this.http.get<any>('https://eco-back-9qg1.onrender.com/category', {}).subscribe(
    (response) => {
      response?.forEach((element:any) => {
        this.items.push(element.categoryName)
      });
    },
    (error) => {
      console.log(error);
    }
  );
    this.myService.getAllProducts().subscribe(
      {
        next:(res:any)=>{
          this.products = res;
          this.products.map((el:any)=>{el.priceAfterSale=el.price*(1-el.sale/100)})
        }
        ,error(err){console.log(err)}
      }
    )
    
  
    
  }
  filter(str:any){
    this.x=str;
  }
  Open(product:any){
      const dialogRef = this.dialog.open(SingleProductComponent, {
        panelClass: 'product-dialog',
        data:product
      });
  }

  minValue: number = 0;
  maxValue: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    }
  };
  p: any = 1;
  count: any = 6;

}
