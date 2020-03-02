import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './chat.component';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = environment.API_URL;
  private socket;

  constructor(private http: HttpClient) {}

  connect() {
    if (!this.socket) {
      this.socket = io(this.url);
    }
  }

  sendMessage(msg, id?) {
    this.socket.emit('add-message', msg);
    if (id) {
      this.socket.emit('say to someone', msg, this.socket.id);
    }
  }

  getChatHistory(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/chat-history`);
  }

  getMessages() {
    return new Observable<Message>(observer => {
      this.socket.on('new-message', msg => {
        observer.next(msg);
      });
    });
  }
}
