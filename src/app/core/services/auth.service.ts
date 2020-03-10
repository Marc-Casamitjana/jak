import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface User {
  username: string;
  password: string;
  id: number;
  friends?: [];
}
export const TOKEN_NAME = 'jwt_token';

export interface HttpResponse {
  status: number;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.API_URL;
  private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

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
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, {
      headers: this.headers
    });
  }

  login(username, password): any {
    return this.http
      .post<any>(
        `${this.url}/login`,
        { username, password },
        {
          headers: this.headers
        }
      )
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
