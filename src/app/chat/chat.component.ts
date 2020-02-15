import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  showChat: boolean = false;
  messagesCollection: Message[] = []
  constructor() { }

  newChat() {
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }

  cleanChat() {
    this.messagesCollection = [];
  }

  addMessage() {
    let message: Message = {
      content: this.chatForm.get('input').value
    }
    this.messagesCollection.push(message);
    this.chatForm.get('input').reset();
  }

  ngOnInit() {
    this.chatForm = new FormGroup({
      input: new FormControl('')
    });
  }

}