import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }
  home: boolean = true;
  about: boolean = false;
  shop: boolean = false;

  search: string = "";
  cart: any = 0;
  wishlist: any = 0;
}
