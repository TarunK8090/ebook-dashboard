/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * AppComponent serves as the root component of the application.
 * It manages the main layout, navigation, and user authentication status.
 */
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'ebook-dashboard';

  /**
   * Tracks the user's login status.
   */
  isLoggedIn = false;

  /**
   * Constructor that injects the required services.
   * 
   * @param authService - Service to handle user authentication.
   * @param router - Router for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to the authentication status to track whether the user is logged in.
   */
  ngOnInit() {
    // Then subscribe to future changes
    this.authService.isLoggedIn$().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngAfterContentInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  

  /**
   * Logs the user out by calling the AuthService and navigates to the login page.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}