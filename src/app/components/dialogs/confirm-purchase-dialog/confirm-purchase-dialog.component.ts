/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * ConfirmPurchaseDialogComponent displays a confirmation dialog for purchasing a book.
 * It allows the user to confirm their purchase, simulates a processing state, and shows success feedback.
 */
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirm-purchase-dialog',
  imports: [
    CommonModule, // Provides Angular common directives
    MatDialogModule, // Material Design dialog module
    MatProgressSpinnerModule, // Material Design progress spinner module
    MatButtonModule // Material Design button module
  ],
  templateUrl: './confirm-purchase-dialog.component.html',
  styleUrl: './confirm-purchase-dialog.component.scss'
})
export class ConfirmPurchaseDialogComponent {
  /**
   * Indicates whether the purchase process is currently in progress.
   */
  isProcessing = false;

  /**
   * Indicates whether the purchase was successful.
   */
  success = false;

  /**
   * Constructor that injects the required services and data.
   * 
   * @param dialogRef - Reference to the currently opened dialog.
   * @param data - Data passed to the dialog, including the book title.
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmPurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookTitle: string }
  ) {}

  /**
   * Simulates the purchase process.
   * Sets `isProcessing` to true, waits for a delay, and then sets `success` to true.
   */
  processPurchase() {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.success = true;
    }, 1800); // Simulate a delay of 1.8 seconds
  }
}