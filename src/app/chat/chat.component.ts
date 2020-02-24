import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
import { AuthService } from '../core/services/auth.service';

export interface Message {
  content: string;
  date?: string;
  user?: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  showChat: boolean;
  messagesCollection: Message[] = [];
  currentUser;

  constructor(private chatService: ChatService, private auth: AuthService) { }

  newChat() {
    this.showChat = true;
    this.chatService.connect();
    this.chatService.getMessages().subscribe(e => {
      this.messagesCollection.push(e);
    });
  }

  closeChat() {
    this.showChat = false;
  }

  cleanChat() {
    this.messagesCollection = [];
  }

  addMessage() {
    const name = location.hash;
    const message = {
      content: this.chatForm.get('input').value,
      name: name
    };
    this.chatForm.get('input').reset();
    this.chatService.sendMessage(message);
  }

  ngOnInit() {
    this.chatForm = new FormGroup({
      input: new FormControl('')
    });
    this.auth.currentUser.subscribe(e => this.currentUser = e);
  }
}