import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { GeneralMessage } from './types';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = environment.API_URL;
  private socket: SocketIOClient.Socket;

  constructor(private http: HttpClient) {}

  enableSocket() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(msg: GeneralMessage, id?: number) {
    console.log(msg);

    this.socket.emit('add-message', msg);
    if (id) {
      this.socket.emit('say to someone', msg);
    }
  }

  getChatHistory(): Observable<GeneralMessage[]> {
    return this.http.get<GeneralMessage[]>(`${this.url}/chat-history`);
  }

  getMessages(): Observable<GeneralMessage> {
    return new Observable<GeneralMessage>((observer) => {
      this.socket.on('new-message', (msg: GeneralMessage) => {
        observer.next(msg);
      });
    });
  }
}
