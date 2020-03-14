import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PrivatesService implements OnInit {
  private socket;
  private url = environment.API_URL;
  currentListener: BehaviorSubject<number> = new BehaviorSubject(null);
  currentListenerId: number;

  constructor() { }

  setListener(listener) {
    this.currentListener.next(10);
  }

  connect() {
    this.socket = io(`${this.url}/private`);  
  }

  ngOnInit() {
    this.currentListener.subscribe((id) => this.currentListenerId = id);
  }
}
