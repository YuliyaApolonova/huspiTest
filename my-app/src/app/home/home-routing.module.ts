/**
 * Created by user on 17.07.17.
 */

import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {ListComponent} from './List/list.component';
import {AddPostComponent} from './add-post/add-post.component';
import {HomeComponent} from './home.component';
import { AuthGuard } from '../auth-guard.service';

const homeRoutes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
          {
            path: 'list',
            component: ListComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'addPost',
            component: AddPostComponent,
            canActivate: [AuthGuard]
          },
        ]
      }
    ];

@NgModule({
  imports: [ RouterModule.forChild(homeRoutes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {}
