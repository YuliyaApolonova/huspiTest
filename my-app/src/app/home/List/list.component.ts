import { Component, OnInit } from '@angular/core';

import {FormatPost} from './dbFormatPost';

import {CurrentDataService} from '../../current-data.service';
import {GetPostsService} from '../../get-posts.service';

import {Sort} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [GetPostsService]
})
export class SickListComponent implements OnInit {

  posts: FormatPost[];

  activePost: FormatPost;
  errorMessage = '';

  constructor(private currentDataService: CurrentDataService, private getPostsService: GetPostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.getPostsService.getPosts()
      .subscribe(posts => {
      this.posts = posts;
      },
      error => this.errorMessage = <any>error,
    );
  }

  deletePost(post, index): boolean {
    this.getPostsService.removePost(index)
      .subscribe(() => this.posts = this.posts.filter(l => l!== post));
    return true;
  }

  editPost(post): void {
    this.activePost = post;
  }

  updatePost(post, index): void {
    this.activePost = null;
    this.getPostsService.updatePost(post, index)
      .subscribe();
  }
}
