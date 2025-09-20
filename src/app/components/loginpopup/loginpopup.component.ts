import { Component, inject } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-loginpopup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './loginpopup.component.html',
  styleUrl: './loginpopup.component.css',
})
export class LoginpopupComponent {
  modal = inject(NgbActiveModal);
  LoginService = inject(LoginService);
  username:string = '';
  password:string = '';
  errorMessage: string = '';

  close() {
    this.modal.close('Save clicked');
  }
  dismiss() {
    this.modal.dismiss('Dismissed');
  }

  loginData(loginForm: any) {
    if (loginForm.valid) {
      let payload = { "username": this.username, "password": this.password };
      this.LoginService.login(payload).subscribe({
        next: (response: LoginResponse) => {
          if (response.success) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('username', response.username);
            this.modal.close(response.message);
            this.LoginService.setLoginCredentials(response.username);
          }
        }, error: (err) => {
          if (err.status === 401) {
            this.errorMessage = err.error.message || 'Invalid login';
          } else {
            this.errorMessage = 'Something went wrong. Please try again later.';
          }
          console.error('Login failed:', err);
        }
      });
    }
  }


}
