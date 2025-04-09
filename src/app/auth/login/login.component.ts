/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * LoginComponent handles the user login functionality.
 * It provides a form for the user to enter their email and password,
 * and uses the AuthService to authenticate the user.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /**
   * The user's email address, bound to the email input field.
   */
  email = '';

  /**
   * The user's password, bound to the password input field.
   */
  password = '';

  /**
   * Controls the visibility of the password field.
   */
  hidePassword = true;

  /**
   * Stores error messages related to login failures.
   */
  errorMessage = '';

  /**
   * Constructor that injects the required services.
   * 
   * @param authService - Service to handle user authentication.
   * @param router - Router for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the form submission for login.
   * Calls the AuthService to authenticate the user and navigates to the home page on success.
   * Displays an error message if authentication fails.
   */
  onSubmit() {
    this.errorMessage = ''; // Clear any previous error messages

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // Navigate to the home page on successful login
      },
      error: (err) => {
        // Display an error message if login fails
        this.errorMessage = err?.message || 'Invalid email or password.';
      }
    });
  }

  /**
   * Navigates to the signup page when the "Sign Up" button is clicked.
   */
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}