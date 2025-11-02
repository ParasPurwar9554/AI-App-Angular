import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { ChatService } from '../../services/chat.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userPrompt: string = '';
  messages: { text: SafeHtml, isUser: boolean }[] = [];

  constructor(
    private chatService: ChatService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer
  ) {}

  async sendMessage() {
  if (this.loginService.checkLoginUser()) {
    if (this.userPrompt.trim()) {
      this.messages.push({ text: this.userPrompt, isUser: true });

      // Call API
      this.chatService.connectToChatModel(this.userPrompt).subscribe(async (response: any) => {
        const markdownText = response.data;
        const html = await marked.parse(markdownText);
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html as string);
        this.messages.push({ text: safeHtml, isUser: false });
      });

      this.userPrompt = '';
    }
  } else {
    alert('Please log in to send messages.');
  }
}

}
