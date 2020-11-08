import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  HttpResponse,
  AuthService,
} from 'src/app/core/services/auth.service';

interface Payload {
  friendName: string;
  currentUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  sendFriendRequest(payload: Payload): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.url}/friend-request`, payload);
  }

  resolveFriendRequest(
    friendName: string,
    isAccepted: boolean,
    username: string
  ): Observable<HttpResponse> {
    const payload = { friendName, username, isAccepted };
    return this.http.post<HttpResponse>(
      `${this.url}/resolve-friend-request`,
      payload
    );
  }
}
