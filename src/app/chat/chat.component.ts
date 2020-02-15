import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
import { tap } from 'rxjs/operators';

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

  constructor(private chatService: ChatService) { }

  newChat() {
    this.showChat = true;
    this.chatService.connect();

  }

  closeChat() {
    this.showChat = false;
  }

  cleanChat() {
    this.messagesCollection = [];
  }

  addMessage() {
    const message: Message = {
      content: this.chatForm.get('input').value
    };
    this.messagesCollection.push(message);
    this.chatForm.get('input').reset();
    this.chatService.sendMessage(message);
    this.chatService.getMessages().subscribe(e => {
      let x = e;
      console.log(e)
    });
  }

  ngOnInit() {
    this.chatForm = new FormGroup({
      input: new FormControl('')
    });

  }

}