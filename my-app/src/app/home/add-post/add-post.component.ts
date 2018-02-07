import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Post} from '../post';
import {IDate} from '../../date';

import {CurrentDataService} from '../../current-data.service';
import {GetPostsService} from '../../get-posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit{

  minDate: IDate = { year: 2017, month: 1, day: 1 };


  constructor(private currentDataService: CurrentDataService, private getPostsService: GetPostsService,
              private  router: Router) {  }

  model = new Post(null, '');

  submitted = false;

  errorMessage = '';

  onSubmit(): void {
    this.submitted = true;
    let dateNow = this.model.dateNow.year + '-' + this.model.dateNow.month + '-' + this.model.dateNow.day;
    let name = this.model.name;
    this.addPost(dateNow, name);
  }

  ngOnInit(): void {
    this.setMinDate();
  }

  setMinDate(): void {
    this.minDate = this.currentDataService.getCurrentDate();
  }

  addPost(date, name): void {
    this.getPostsService.createPost(date, name)
      .subscribe(post => {
          console.log('new post' + post);
        },
        error => {this.errorMessage = <any>error});

    this.router.navigate(['/home/list']);
  }

}
