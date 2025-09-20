import { Routes } from '@angular/router';
import { McqComponent } from './components/mcq/mcq.component'; // adjust path if needed
import { ChatComponent } from './components/chat/chat.component';
import { RagComponent } from './components/rag/rag.component';


export const routes: Routes = [
  {
    path: 'chat-app', component: ChatComponent
  },
  {
    path: 'mcq-generator', component: McqComponent
  },
  {
    path:'rag-app',component:RagComponent
  }
  
];
