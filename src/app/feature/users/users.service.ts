import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User, HttpResponse } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getNotifications(user: User): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${environment.API_URL}/notifications/${user.id}`);
  }
}