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

  private url = 'http://83.39.26.227:3000';
  private socket;

  constructor(private http: HttpClient) {

  }

  connect() {
    this.socket = io(this.url);
    // return this.http.get('http://localhost:3000/connect', { responseType: 'text' })
  }

  sendMessage(msg, id?) {
    this.socket.emit('add-message', msg);
    // id =hola  'haha';
    if (id) {
      this.socket.emit('say to someone', msg, this.socket.id);
    }
  }

  getMessages() {
    return new Observable<Message>((observer) => {
      this.socket.on('new-message', (msg) => {
        observer.next(msg);
      });
    });
  }
}
