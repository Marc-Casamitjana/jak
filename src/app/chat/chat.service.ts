import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);

  }

  connect() {
    // return this.http.get('http://localhost:3000/connect', { responseType: 'text' })
  }

  sendMessage(msg) {
    this.socket.emit('new-message', msg);
  }

  getMessages() {
    return new Observable((observer) => {
      this.socket.on('new-message', (msg) => {
        observer.next(msg);
      });
    });
  }
}
