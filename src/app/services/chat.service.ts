import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  connectToChatModel(userPrompt: string): Observable<{ success: boolean; message: string; data: any }> {
    const payload = { user_prompt: userPrompt };
    return this.http.post<{success: boolean;message:string, data: any}>(`${this.baseUrl}/chat-model`, payload);
  }


}
