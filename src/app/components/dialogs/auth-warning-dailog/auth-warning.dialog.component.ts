/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * AuthWarningDialogComponent displays a warning dialog when a user tries to access restricted content
 * without being logged in or without purchasing the required book.
 * It provides options to either navigate to the login page or close the dialog.
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'auth-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './auth-warning.dialog.component.html',
  styleUrl: './auth-warning.dialog.component.scss',
})
export class AuthWarningDialogComponent {
  /**
   * Constructor that injects the MatDialogRef to control the dialog.
   * 
   * @param dialogRef - Reference to the currently opened dialog.
   */
  constructor(private dialogRef: MatDialogRef<AuthWarningDialogComponent>) {}

  /**
   * Closes the dialog and signals that the user wants to navigate to the login page.
   */
  goToLogin() {
    this.dialogRef.close('login');
  }

  /**
   * Closes the dialog without any additional action.
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
