/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * DashboardComponent handles the main dashboard functionality of the application.
 * It is responsible for displaying a list of books in a grid layout.
 * It fetches book data from the BookService, tracks user progress, and handles book purchases.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../services/book.service';
import { MatIcon } from '@angular/material/icon';
import { BookProgress, StorageService } from '../services/storage.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthWarningDialogComponent } from '../components/dialogs/auth-warning-dailog/auth-warning.dialog.component';
import { ConfirmPurchaseDialogComponent } from '../components/dialogs/confirm-purchase-dialog/confirm-purchase-dialog.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatProgressBar,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  /**
   * List of books to display on the dashboard.
   */
  books: any[] = [];

  /**
   * List of purchased book IDs.
   */
  purchasedBooks: string[] = [];

  /**
   * Tracks the user's login status.
   */
  isLoggedIn: boolean = false;

  /**
   * The authentication token for the user, retrieved from local storage.
   */
  token: string | null = localStorage.getItem('auth_token');

  /**
   * Reading progress for each book.
   */
  progress: { [bookId: string]: BookProgress } = {};

  /**
   * Progress percentage for each category.
   */
  categoryProgress: { [category: string]: number } = {};

  /**
   * Constructor that injects required services.
   * 
   * @param bookService - Service to fetch book data.
   * @param authService - Service to handle authentication.
   * @param storageService - Service to manage storage and progress.
   * @param router - Router for navigation.
   * @param dialog - Dialog service for showing warnings.
   */
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches the list of books, initializes progress and purchased books, and subscribes to login status.
   */
  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      this.progress = this.storageService.getAllProgress();
      this.purchasedBooks = this.storageService.getPurchasedBooks();
      this.calculateCategoryProgress();
    });

    this.authService.isLoggedIn$().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  /**
   * Handles book purchase logic.
   * If the user is not logged in, shows a warning dialog and redirects to login or home.
   * If logged in, marks the book as purchased and updates the purchased books list.
   * 
   * @param bookId - The ID of the book to purchase.
   */
  purchase(bookId: string): void {  
    if (!this.token) {
      const dialogRef = this.dialog.open(AuthWarningDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'login') {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/']);
        }
      });
      return;
    }
  
    // Check if the book is already purchased
    const book = this.books.find(b => b.id === bookId);
    const confirmRef = this.dialog.open(ConfirmPurchaseDialogComponent, {
      data: { bookTitle: book?.title || 'this book' },
      disableClose: true
    });
  
    // Handle the confirmation dialog result
    confirmRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.storageService.purchaseBook(bookId);
        this.purchasedBooks = this.storageService.getPurchasedBooks();
      }
    });
  }
  

  /**
   * Checks if a book has been purchased.
   * 
   * @param bookId - The ID of the book to check.
   * @returns True if the book has been purchased, false otherwise.
   */
  isPurchased(bookId: string): boolean {
    return this.purchasedBooks.includes(bookId);
  }

  /**
   * Calculates the progress percentage for a specific book.
   * 
   * @param book - The book object to calculate progress for.
   * @returns The progress percentage as a number.
   */
  getProgressPercent(book: any): number {
    const prog = this.progress[book.id];
    if (!prog) return 0;
    return Math.floor((prog.line / (book.content.length - 1)) * 100);
  }

  /**
   * Calculates the progress percentage for each category based on the books and their progress.
   */
  calculateCategoryProgress(): void {
    const map: { [category: string]: { total: number; completed: number } } = {};

    this.books.forEach((book) => {
      const { id, category, content } = book;
      const total = content.length;
      const read = this.progress[id]?.line ?? 0;

      if (!map[category]) map[category] = { total: 0, completed: 0 };

      map[category].total += total;
      map[category].completed += read;
    });

    Object.keys(map).forEach((cat) => {
      const { completed, total } = map[cat];
      this.categoryProgress[cat] = Math.floor((completed / total) * 100);
    });
  }

  /**
   * Navigates to the reader component for the selected book.
   * 
   * @param bookId - The ID of the book to read.
   */
  readBook(bookId: string): void {
    if (!this.token) {
      const dialogRef = this.dialog.open(AuthWarningDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'login') {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/']);
        }
      });
      return;
    }
    this.router.navigate(['/reader', bookId]);
  }
}