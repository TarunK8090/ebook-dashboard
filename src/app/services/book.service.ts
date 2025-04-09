/**
 * Author: Tarun Kumar
 * Date: April 8, 2025
 *
 * Description:
 * BookService provides methods to retrieve book data.
 * It simulates a backend service by returning mock data with a delay.
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class BookService {
  /**
   * Mock data representing a list of books.
   * Each book contains an ID, title, category, and content.
   */
  private books = [
    {
      id: '1',
      title: 'Angular Essentials',
      category: 'Frontend Development',
      price: 29.99,
      content: [
        'Line 1: Angular Overview',
        'Line 2: Component Lifecycle',
        'Line 3: Data Binding Techniques',
        'Line 4: Angular CLI & Structure',
        'Line 5: Real-world Use Cases',
      ],
    },
    {
      id: '2',
      title: 'RxJS in Depth',
      category: 'Reactive Programming',
      price: 39.99,
      content: [
        'Line 1: Understanding Observables',
        'Line 2: Cold vs Hot Observables',
        'Line 3: Operators Deep Dive',
        'Line 4: Error Handling Patterns',
        'Line 5: Practical Examples',
      ],
    },
    {
      id: '3',
      title: 'Mastering TypeScript',
      category: 'Programming Languages',
      price: 24.99,
      content: [
        'Line 1: TypeScript Basics',
        'Line 2: Interfaces and Types',
        'Line 3: Advanced Typing',
        'Line 4: Decorators and Metadata',
        'Line 5: Configuring TypeScript',
      ],
    },
    {
      id: '4',
      title: 'Node.js Fundamentals',
      category: 'Backend Development',
      price: 34.99,
      content: [
        'Line 1: Introduction to Node.js',
        'Line 2: Working with Modules',
        'Line 3: File System Access',
        'Line 4: HTTP Module',
        'Line 5: Express Framework',
      ],
    },
    {
      id: '5',
      title: 'MongoDB for Developers',
      category: 'Databases',
      price: 49.99,
      content: [
        'Line 1: Document-Oriented Data',
        'Line 2: CRUD Operations',
        'Line 3: Aggregation Framework',
        'Line 4: Indexing and Performance',
        'Line 5: Connecting with Mongoose',
      ],
    },
    {
      id: '6',
      title: 'Python for Data Science',
      category: 'Data Science',
      price: 44.99,
      content: [
        'Line 1: Python Basics',
        'Line 2: Numpy and Pandas',
        'Line 3: Data Visualization',
        'Line 4: Machine Learning Models',
        'Line 5: Scikit-learn and Beyond',
      ],
    },
    {
      id: '7',
      title: 'DevOps Essentials',
      category: 'Operations',
      price: 54.99,
      content: [
        'Line 1: What is DevOps?',
        'Line 2: CI/CD Concepts',
        'Line 3: Docker & Containerization',
        'Line 4: Kubernetes Basics',
        'Line 5: Monitoring & Logging',
      ],
    },
    {
      id: '8',
      title: 'GraphQL Explained',
      category: 'API Development',
      price: 39.99,
      content: [
        'Line 1: What is GraphQL?',
        'Line 2: Queries and Mutations',
        'Line 3: Schema Design',
        'Line 4: Apollo Client & Server',
        'Line 5: Real-time with Subscriptions',
      ],
    },
    {
      id: '9',
      title: 'CSS Masterclass',
      category: 'Web Design',
      price: 29.99,
      content: [
        'Line 1: Flexbox and Grid',
        'Line 2: Responsive Design',
        'Line 3: Animations and Transitions',
        'Line 4: CSS Architecture',
        'Line 5: Modern Frameworks',
      ],
    },
  ];

  /**
   * Retrieves the list of all books.
   *
   * @returns An observable that emits the list of books after a simulated delay of 500ms.
   */
  getBooks() {
    return of(this.books).pipe(delay(500)); // Simulate network delay
  }

  /**
   * Retrieves a single book by its ID.
   *
   * @param id - The ID of the book to retrieve.
   * @returns An observable that emits the book object after a simulated delay of 300ms.
   */
  getBookById(id: string) {
    const book = this.books.find((b) => b.id === id);
    return of(book).pipe(delay(300));
  }
}
