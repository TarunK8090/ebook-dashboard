/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * SignupComponent handles user registration functionality.
 * It provides a form for users to enter their username, email, password, and confirm password.
 * The component validates the input and interacts with the AuthService to register the user.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  /**
   * The user's username, bound to the username input field.
   */
  username = '';

  /**
   * The user's email address, bound to the email input field.
   */
  email = '';

  /**
   * The user's password, bound to the password input field.
   */
  password = '';

  /**
   * The user's confirmation password, bound to the confirm password input field.
   */
  confirmPassword = '';

  /**
   * Controls the visibility of the password field.
   */
  hidePassword = true;

  /**
   * Controls the visibility of the confirm password field.
   */
  hideConfirmPassword = true;

  /**
   * Constructor that injects the required services.
   * 
   * @param authService - Service to handle user authentication.
   * @param router - Router for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the form submission.
   * Validates that the password and confirm password fields match.
   * If valid, calls the AuthService to register the user and navigates to the home page.
   */
  onSubmit() {
    if (this.password !== this.confirmPassword) return;

    this.authService.signup(this.email, this.password, this.username).subscribe({
      next: () => this.router.navigate(['/']), // Navigate to the home page on successful signup
      error: (err) => alert(err.message) // Display an error message if signup fails
    });
  }
}