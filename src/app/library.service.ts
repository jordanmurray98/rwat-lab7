import { Injectable } from '@angular/core';
import { LibraryBook, LibraryBookResponse } from './library-book';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  url = 'https://openlibrary.org/subjects/science_fiction.json?limit=50';

  bookCache: LibraryBook[] = [];

  constructor(private router: Router) {}

  async getBooks(): Promise<LibraryBook[]> {
    if(this.bookCache.length > 0){
      return this.bookCache;
    }
    try {
      const response = await fetch(this.url);
      const data = await response.json();
  
      const mappedData = data.works?.map((item: LibraryBookResponse) => ({
        key: item.key,
        title: item.title,
        year: item.first_publish_year,
        author: item.authors && item.authors.length > 0 ? item.authors[0].name : '',
        subject: item.subject && item.subject.length > 0 ? item.subject[0] : '',
        coverUrl: item.cover_id ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg` : '',
      })) ?? [];

      this.bookCache = mappedData;

      return mappedData;
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return [];
    }
  }

  getBookById(key: string) {
    return this.bookCache.find(book => book.key === key) ?? null;
  }

  submitOrder(firstName: string, lastName: string, email: string, bookTitle: string) {
    if(!firstName || !lastName || !email){
      Swal.fire({
        title: 'Please enter your personal information',
        toast: true, 
        position: 'top-end',
        icon: 'error', 
        showConfirmButton: false, 
        timer: 3000, 
        timerProgressBar: true,
      });

      return;
    }
    this.router.navigate(['/']);
    Swal.fire({
      title: 'Order Successful!',
      html: `
        <p><strong>Book Title:</strong> ${bookTitle}</p>
        <p><strong>Customer Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      toast: true, 
      position: 'top-end',
      icon: 'success', 
      showConfirmButton: false, 
      timer: 3000, 
      timerProgressBar: true,
    });
  }
}
