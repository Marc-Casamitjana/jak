import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
import { AuthService, User } from '../../core/services/auth.service';
import { concat } from 'rxjs';

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
  currentUser: User;

  constructor(private chatService: ChatService, private auth: AuthService) {}

  enableSocket() {
    this.chatService.connect();
    concat(
      this.chatService.getChatHistory(),
      this.chatService.getMessages()
    ).subscribe((msg: any) => {
      Array.isArray(msg)
        ? msg.forEach(e => this.messagesCollection.push(e))
        : this.messagesCollection.push(...msg);
    });
  }

  closeChat() {
    this.showChat = false;
  }

  cleanChat() {
    this.messagesCollection = [];
  }

  addMessage() {
    const message = {
      content: this.chatForm.get('input').value,
      username: this.currentUser.username,
      date: new Date()
    };
    this.chatForm.get('input').reset();
    this.chatService.sendMessage(message);
  }

  ngOnInit() {
    this.auth.currentUser.subscribe((e: User) => (this.currentUser = e));
    this.enableSocket();
    this.chatForm = new FormGroup({
      input: new FormControl('')
    });
  }
}
