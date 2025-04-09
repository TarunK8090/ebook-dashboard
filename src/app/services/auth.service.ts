/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * AuthService provides authentication-related functionality such as login, signup, logout,
 * and checking the user's authentication status.
 * It uses localStorage to simulate user authentication and persistence.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Makes this service available application-wide
})
export class AuthService {
  /**
   * BehaviorSubject to track the user's login status.
   * It is initialized based on whether a token exists in localStorage.
   */
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  /**
   * Key used to store the list of users in localStorage.
   */
  private userKey = 'users';

  /**
   * Key used to store the authentication token in localStorage.
   */
  private tokenKey = 'auth_token';

  /**
   * Simulates a login process by checking the provided email and password
   * against the stored user list in localStorage.
   * 
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns An observable that emits `true` if login is successful, or throws an error if invalid credentials are provided.
   */
  login(email: string, password: string): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);

    if (!found) {
      return throwError(() => new Error('Invalid email or password.'));
    }

    localStorage.setItem(this.tokenKey, 'fake-jwt-token');
    this.loggedIn$.next(true);
    return of(true).pipe(delay(500)); // Simulates a delay for the login process
  }

  /**
   * Simulates a signup process by adding a new user to the localStorage user list.
   * If the email already exists, it throws an error.
   * 
   * @param email - The user's email address.
   * @param password - The user's password.
   * @param username - (Optional) The user's username.
   * @returns An observable that emits `true` after the signup process.
   */
  signup(email: string, password: string, username?: string): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const exists = users.find((u: any) => u.email === email);

    if (exists) {
      return throwError(() => new Error('User already exists.'));
    }

    users.push({ email, password, username });
    localStorage.setItem(this.userKey, JSON.stringify(users));
    return this.login(email, password); // Automatically logs in the user after signup
  }

  /**
   * Logs the user out by removing the authentication token from localStorage
   * and updating the login status.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
  }

  /**
   * Returns an observable of the user's login status.
   * 
   * @returns An observable that emits the current login status.
   */
  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
  

  /**
   * Checks if an authentication token exists in localStorage.
   * 
   * @returns `true` if a token exists, otherwise `false`.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}