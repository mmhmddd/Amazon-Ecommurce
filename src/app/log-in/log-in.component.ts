import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Import AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  phone = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.phone)) {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      alert('Account not found! Please register.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
