import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LibraryService } from '../library.service';
import { LibraryBook } from '../library-book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <section *ngIf="bookItem" class="order-confirmation">
        <div class="book-info">
          <img 
            *ngIf="bookItem.coverUrl" 
            [src]="bookItem.coverUrl" 
            alt="Cover art of {{ bookItem.title }}" 
            class="book-cover"
          />
          <div class="details">
            <h2>Order Details</h2>
            <h3>{{ bookItem.title }}</h3>
            <p><strong>Author:</strong> {{ bookItem.author }}</p>
            <p><strong>Published Year:</strong> {{ bookItem.year }}</p>
            <p><strong>Subject:</strong> {{ bookItem.subject }}</p>
          </div>
        </div>
      </section>

      <section class="order-form">
        <form [formGroup]="orderForm" (submit)="submitOrder()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Order</button>
        </form>
      </section>
    </div>
  `,
  styleUrl: `./order.component.css`
})
export class OrderComponent {
  bookService = inject(LibraryService);
  bookItem: LibraryBook | null;
  route: ActivatedRoute = inject(ActivatedRoute);
  orderForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    this.bookItem = this.bookService.getBookById(this.route.snapshot.params['key']);
  }

  submitOrder() {
    this.bookService.submitOrder(
      this.orderForm.value.firstName ?? '',
      this.orderForm.value.lastName ?? '',
      this.orderForm.value.email ?? '',
      this.bookItem?.title ?? ''
    );
  }
}
