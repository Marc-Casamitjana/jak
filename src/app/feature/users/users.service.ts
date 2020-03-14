import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  AuthService,
  User,
  HttpResponse
} from 'src/app/core/services/auth.service';
import { Observable, of } from 'rxjs';

export interface Notification {
  content: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: User;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.currentUser = this.auth.currentUserValue;
  }

  getNotifications(user: User): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(
      `${environment.API_URL}/notifications/${user.id}`
    );
  }

  getFriends(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(
      `${environment.API_URL}/friends/${this.currentUser.id}`
    );
  }
}
