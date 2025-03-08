import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  register(user: { name: string; phone: string; password: string }): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.phone === user.phone)) {
      return false; 
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(phone: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: any) => u.phone === phone);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }
}
