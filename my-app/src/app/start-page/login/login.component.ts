import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {User} from './user';
import {AuthService} from '../../auth.service';
import {IResponse} from '../../response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

 constructor(private authService: AuthService, private router: Router) { }

  model = new User('', '');
  submitted = false;
  response = '';

  onSubmit(): void {
    this.submitted = true;
    const username = this.model.username;
    const password = this.model.password;
    this.authService.login(username, password)
      .subscribe(data => {
        if(data) {
          this.router.navigate(['/home']);
          console.log('is logged in: ' + this.authService.isLoggedIn());
          let currentUsr = this.authService.currentUser();
          console.log('current user' + currentUsr.username);
          console.log('user id: ' + currentUsr.id);
          console.log('user email: ' + currentUsr.email);
        }
        else{
          console.log('Authorisation error');
        }
      });
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook()
      .subscribe(data => {
        if(data) {
          this.router.navigate(['/home']);
          console.log('is logged in: ' + this.authService.isLoggedIn());
          let currentUsr = this.authService.currentUser();
          console.log('current user' + currentUsr.username);
          console.log('user id: ' + currentUsr.id);
          console.log('user email: ' + currentUsr.email);
        }
        else{
          console.log('Authorisation error');
        }
      })
  }

}
