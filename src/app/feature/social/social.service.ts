import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersData } from './social.component';
import { User, HttpResponse } from 'src/app/core/services/auth.service';
interface Payload {
  requestedUser: User;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getFriend(usersData: UsersData): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.url}/user`, usersData);
  }

  sendFriendRequest(payload: Payload): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.url}/friend-request`, payload);
  }
}
