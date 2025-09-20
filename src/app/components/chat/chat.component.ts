import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userPrompt: string = '';
  messages: { text: string, isUser: boolean }[] = [];

  constructor(private chatService: ChatService, private LoginService: LoginService) { }

  sendMessage() {
    if (this.LoginService.checkLoginUser()) {
      if (this.userPrompt.trim()) {
        this.messages.push({ text: this.userPrompt, isUser: true });
        this.chatService.connectToChatModel(this.userPrompt).subscribe((response: any) => {
          this.messages.push({ text: response.data, isUser: false });
          console.log(response);
        });
        this.userPrompt = '';
      }
    } else {
      alert('Please log in to send messages.');
    }
  }

}
