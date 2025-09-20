import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginpopupComponent } from './components/loginpopup/loginpopup.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavModule,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AI-App-Angular';
  private modalService = inject(NgbModal);
  private LoginService = inject(LoginService);
  isLoginUser: boolean = false;
  username:string = '';
  ngOnInit(){
    this.LoginService.isLoginSubject$.subscribe((isLoggedIn) => {
       this.isLoginUser = isLoggedIn;
     });
     this.LoginService.userName$.subscribe((name) => {
       this.username = name;
     }); 
  }
  
  loginPopUp() {
     const modalRef = this.modalService.open(LoginpopupComponent, { centered: true });
     modalRef.result.then(
      (result) => console.log('Closed with:', result),
      (reason) => console.log('Dismissed with:', reason)
    );
  }
  
  logout() {
    localStorage.removeItem('authToken');
    this.isLoginUser = false;
    console.log('User logged out');
  }

}
