import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './chat.component';
import { GeneralMessage } from './types';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = environment.API_URL;

  constructor(private http: HttpClient, private socket: Socket) {}

  sendMessage(msg: GeneralMessage, id?: number) {
    console.log(msg);

    this.socket.emit('add-message', msg);
    if (id) {
      this.socket.emit('say to someone', msg);
    }
  }

  getChatHistory(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/chat-history`);
  }

  getMessages(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.socket.on('new-message', (msg) => {
        observer.next(msg);
      });
    });
  }
}
