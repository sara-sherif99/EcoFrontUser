import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthComponent } from './auth/auth.component';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService,public dialog: MatDialog) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      const dialogRef = this.dialog.open(AuthComponent, {
        width: '350px',
        panelClass: 'auth-dialog',
      });
      return false;
    }
  }
  
}
