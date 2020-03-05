import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersData } from './social.component';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getFriend(usersData: UsersData): Observable<string> {
    return this.http.post<string>(`${this.url}/user/`, usersData);
  }
}
