import { Component, OnInit, NgZone} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormatPost} from './List/dbFormatPost';

import {IResponse} from '../response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{



  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }

}
