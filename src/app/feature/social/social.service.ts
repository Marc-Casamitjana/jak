import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getFriend(name): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${name}`);
  }
}
