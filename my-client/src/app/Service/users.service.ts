

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Users } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _url: string = "./assets/data/users.json"

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<Users[]>{
    return this._http.get<Users[]>(this._url).pipe(
      retry(3),
      catchError(this.handleErr)
    );
  }
  handleErr(err: HttpErrorResponse){
    return throwError(() => new Error(err.message))
  }
  getUserById(id: number): Observable<any | undefined> {
    return this._http.get<any[]>(this._url).pipe(
      map(users => users.find(user => user.userid === id))
    );
  }



 }



