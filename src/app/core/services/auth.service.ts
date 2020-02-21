import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export interface User {
  name: string;
  password: string;
}
export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000';
  private headers = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt.decode(token);

  //   if (jwt.exp === undefined) return null;

  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if(!token) token = this.getToken();
  //   if(!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if(date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }

  login(user): Observable<User> {
    console.log(`${this.url}/login`);

    return this.http
      .post<User>(`${this.url}/login`, JSON.stringify(user), {
        headers: this.headers
      })
      .pipe(tap(res => console.log(res)));
  }
}
