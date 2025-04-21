/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * StorageService provides methods to save and retrieve reading progress for books.
 * It uses the browser's localStorage to persist data, including page, line, and category-level tracking.
 */
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

/**
 * Represents the structure of saved reading progress for a book.
 */
export interface BookProgress {
  page: number;
  line: number;
  category: string;
}

@Injectable({
  providedIn: 'root' // Makes this service globally available
})
export class StorageService {
  /**
   * The localStorage key under which all reading progress is stored.
   */
  private storageKey = 'readingProgress';

  /**
   * Saves the reading progress for a specific book, including page, line, and category.
   * 
   * @param bookId - The ID of the book.
   * @param page - The current page number.
   * @param line - The current line number.
   * @param category - The category of the book.
   */
  saveProgress(bookId: string, page: number, line: number, category: string): void {
    const allProgress = this.getAllProgress();
    allProgress[bookId] = { page, line, category };
    localStorage.setItem(this.storageKey, JSON.stringify(allProgress));
  }

  /**
   * Retrieves the saved reading progress for a specific book.
   * 
   * @param bookId - The ID of the book.
   * @returns An object containing page, line, and category. Returns defaults if no progress found.
   */
  getProgress(bookId: string): BookProgress {
    const allProgress = this.getAllProgress();
    return allProgress[bookId] || { page: 0, line: 0, category: '' };
  }

  /**
   * Retrieves reading progress for all books.
   * 
   * @returns An object with book IDs as keys and their progress as values.
   */
  getAllProgress(): { [bookId: string]: BookProgress } {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  /**
   * Clears all stored reading progress. Useful for testing or resetting.
   */
  clearAllProgress(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Retrieves the list of purchased book IDs from localStorage.
   * 
   * @returns An array of book IDs that have been purchased.
   */
  getPurchasedBooks(): string[] {
    return JSON.parse(localStorage.getItem('purchasedBooks') || '[]');
  }

  /**
   * Marks a book as purchased by adding its ID to the purchased books list in localStorage.
   * 
   * @param bookId - The ID of the book to mark as purchased.
   */
  purchaseBook(bookId: string): Observable<boolean> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Unauthorized'));
    }
  
    const purchased = JSON.parse(localStorage.getItem('purchasedBooks') || '[]');
    if (!purchased.includes(bookId)) {
      purchased.push(bookId);
      localStorage.setItem('purchasedBooks', JSON.stringify(purchased));
    }
  
    return of(true).pipe(delay(500));
  }
  

  /**
   * Checks if a book has been purchased.
   * 
   * @param bookId - The ID of the book to check.
   * @returns `true` if the book has been purchased, otherwise `false`.
   */
  isBookPurchased(bookId: string): boolean {
    return this.getPurchasedBooks().includes(bookId);
  }
}