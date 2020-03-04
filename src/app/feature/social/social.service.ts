import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getFriend(name): Observable<string> {
    return this.http.get<string>(`${this.url}/user/${name}`);
  }
}
