/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 * 
 * Description:
 * ReaderComponent is responsible for displaying the content of a book line by line.
 * It allows users to navigate through the book's content, save their reading progress, and track their progress percentage.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../services/book.service';
import { StorageService } from '../services/storage.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthWarningDialogComponent } from '../components/dialogs/auth-warning-dailog/auth-warning.dialog.component';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBar, MatDialogModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
})
export class ReaderComponent implements OnInit {
  /**
   * The book object containing the title, content, and other metadata.
   */
  book: any;

  /**
   * The index of the currently active line in the book's content.
   */
  currentLine: number = 0;

  /**
   * The ID of the book being read, retrieved from the route parameters.
   */
  bookId!: string;

  /**
   * The number of lines displayed per page.
   */
  linesPerPage = 20;

  /**
   * Constructor that injects the required services.
   * 
   * @param route - Provides access to the route parameters.
   * @param bookService - Service to fetch book data.
   * @param storageService - Service to save and retrieve reading progress.
   * @param router - Router for navigation.
   * @param dialog - Dialog service for showing warnings.
   */
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches the book data, checks login and purchase status, and retrieves the user's reading progress.
   */
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId')!;

    // Check login (auth_token)
    const isLoggedIn = !!localStorage.getItem('auth_token');
    if (!isLoggedIn || !this.storageService.isBookPurchased(this.bookId)) {
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

    // Load the book
    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.book = book;
      const progress = this.storageService.getProgress(this.bookId);
      this.currentLine = progress?.line ?? 0;
    });
  }

  /**
   * Calculates the current page based on the line and lines per page.
   * 
   * @returns The current page number.
   */
  getCurrentPage(): number {
    return Math.floor(this.currentLine / this.linesPerPage);
  }

  /**
   * Navigates to the next line in the book's content.
   * Updates the reading progress in the StorageService.
   */
  nextLine(): void {
    if (this.book && this.currentLine < this.book.content.length - 1) {
      this.currentLine++;
      this.saveProgress();
    }
  }

  /**
   * Moves to the previous line and saves progress.
   */
  previousLine(): void {
    if (this.book && this.currentLine > 0) {
      this.currentLine--;
      this.saveProgress();
    }
  }

  /**
   * Resets reading to the beginning and updates stored progress.
   */
  resetProgress(): void {
    this.currentLine = 0;
    this.saveProgress();
  }

  /**
   * Saves progress manually for any selected line (e.g., when a line is clicked).
   * 
   * @param lineIndex - The index of the line clicked.
   */
  saveProgressAt(lineIndex: number): void {
    this.currentLine = lineIndex;
    this.saveProgress();
  }

  /**
   * Saves current reading progress including page, line, and category.
   */
  private saveProgress(): void {
    const page = this.getCurrentPage();
    const line = this.currentLine;
    const category = this.book.category ?? 'Uncategorized';

    this.storageService.saveProgress(this.bookId, page, line, category);
  }

  /**
   * Calculates the progress percentage of the book being read.
   * 
   * @returns The progress percentage as a number.
   */
  getProgressPercent(): number {
    if (!this.book) return 0;
    return Math.floor(
      (this.currentLine / (this.book.content.length - 1)) * 100
    );
  }
}