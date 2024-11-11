import { Component, Input } from '@angular/core';
import { LibraryBook } from '../library-book';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink],
  template: `
  <section class="book-item">
    <img 
      *ngIf="bookItem.coverUrl" 
      [src]="bookItem.coverUrl" 
      alt="Cover art of {{ bookItem.title }}" 
      class="book-cover"
    />
    <div class="book-details">
      <h3>{{ bookItem.title }}</h3>
      <p><strong>Author:</strong> {{ bookItem.author }}</p>
      <p><strong>Year:</strong> {{ bookItem.year }}</p>
      <p><strong>Subject:</strong> {{ bookItem.subject }}</p>
      <a [routerLink]="['/order', bookItem.key]" class="order-link">Order Now</a>
    </div>
  </section>
`,
  styleUrl: `./book.component.css`
})
export class BookComponent {
  @Input() bookItem!: LibraryBook;
}
