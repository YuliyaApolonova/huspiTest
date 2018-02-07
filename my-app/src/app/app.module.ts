import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';

import {AppRoutingModule} from "./app-routing.module";
import {StartPageModule} from "./start-page/start-page.module";
import {HomeModule} from "./home/home.module";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CurrentDataService} from "./current-data.service";
import {GetPostsService} from "./get-posts.service";
import {AuthService} from './auth.service';
import {AuthGuard} from "./auth-guard.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StartPageModule,
    HomeModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [CurrentDataService, GetPostsService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
