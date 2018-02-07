
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    return this.checkLogin();
  }

  // checkLogin(url: string): boolean {
    checkLogin(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('Auth guard: isLoggedIn = true' );
      return true;
    }
    else{
      localStorage.removeItem('mean-token');
      alert('Your session was expired. Please, sign in again.');
      this.router.navigate(['/start']);
      console.log('Auth guard: isLoggedIn = false' );
      return false;
    }

  }
}
