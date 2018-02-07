
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HomeComponent} from "./home.component";
import { AddPostComponent } from './add-list/add-list.component';
import { ListComponent } from './List/list.component';

import {HomeRoutingModule} from './home-routing.module';

import {FormsModule} from '@angular/forms';
import { AdminComponent } from './admin/admin.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorHandlerService} from "./errorHandler-service";
import {MatPaginatorModule} from "@angular/material";
import {MatSortModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgbModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    HomeComponent,
    AddPostComponent,
    ListComponent
  ],
  providers: [
    ErrorHandlerService
  ]
})
export class HomeModule { }
