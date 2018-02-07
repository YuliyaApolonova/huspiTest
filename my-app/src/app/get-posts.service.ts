
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {FormatPost} from './home/List/dbFormatPost';
import {IResponse} from './response';

@Injectable()
export class GetPostsService {

  private baseUrl = 'http://localhost:1337';

  private headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('mean-token')).token});

  constructor(private http: Http) { }

  getPosts(): Observable<FormatPost[]> {
    return this.http.get(this.baseUrl + '/list', {headers: this.headers})
      .map((response: Response) => response.json().data as FormatPost[])
      .catch(this.handleError);
  }

  createPost(date, name): Observable<FormatPost> {
    return this.http.post(this.baseUrl + '/add', JSON.stringify({dateNow: date, name: name}), {headers: this.headers})
      .map((response: Response) => response.json().data as FormatPost)
      .catch(this.handleError);
  }

  removePost(index): Observable<void> {
    const url = this.baseUrl + '/remove';
    const myParams = new URLSearchParams();
    myParams.set('index', index);
    console.log(myParams);
    return this.http.delete(url, {headers: this.headers, params: myParams})
      .map(() => null)
      .catch(this.handleError);
  }

  updatePost(post, index): Observable<void> {
    const url = this.baseUrl + '/update';
    const myParams = new URLSearchParams();
    myParams.set('index', index);
    console.log(myParams);
    return this.http.put(url, JSON.stringify(post), {headers: this.headers, params: myParams})
      .map(() => null)
      .catch(this.handleError);
  }

   private handleError(error: Response | any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
