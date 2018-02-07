/**
 * Created by user on 29.09.17.
 */
/**
 * Created by user on 18.07.17.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class StartActivateGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/home"]);
      return false;
    } else {
      this.router.navigate(["/start"]);
      return true;
    }
  }
}
