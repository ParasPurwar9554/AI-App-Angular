import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable,BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl;
  isLoginSubject$ = new BehaviorSubject<boolean>(this.checkLoginUser());
  userName$ = new BehaviorSubject<string>(this.checkUserName());

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  login(payload:any): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload);
  }  

 checkLoginUser(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  checkUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
       return localStorage.getItem('username') || '';
    }
    return ''; 
  }
  setLoginCredentials(username: string = ''): void {
    this.isLoginSubject$.next(true);
    this.userName$.next(username);
  }

}
