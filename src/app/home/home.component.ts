import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryBook } from '../library-book';
import { LibraryService } from '../library.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookComponent],
  template: `
    <form>
      <input type="text" placeholder="Search for book by title" #filter>
      <button class="primary" type="button" (click)="searchBook(filter.value)">Search</button>
    </form>
    <section>
      <app-book *ngFor="let book of filteredSearchBookList" [bookItem]="book"></app-book>
    </section>

    <p *ngIf="books.length === 0">Loading...</p>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  books: LibraryBook[] = [];
  filteredSearchBookList: LibraryBook[] = [];

  libraryService: LibraryService = inject(LibraryService);
  constructor() {
    (async () => {
      const data = await this.libraryService.getBooks();
      this.books = data;
      this.filteredSearchBookList = this.books;
    })();
  }

  searchBook(text: string) {
    if (!text) {
      this.filteredSearchBookList = this.filteredSearchBookList;
      return;
    }
    this.filteredSearchBookList = this.filteredSearchBookList.filter((book) =>
      book?.title.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
