import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ensure the correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  phone = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.authService.register({ name: this.name, phone: this.phone, password: this.password })) {
      alert('Account created successfully!');
      this.router.navigate(['/login']);
    } else {
      alert('User already exists!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
