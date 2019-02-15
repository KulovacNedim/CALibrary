import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from '../../book.model';

@Injectable()
export class BookService {

    bookForEdit: Book = new Book();
    booksForLoad: Book[] = [];


    constructor(private http: HttpClient) {
    }


    importBooks() {
        return this.http.get('http://localhost:8080/books/getBooks');
    }

    addBook(book: Book) {
        return this.http.post('http://localhost:2000/add', book, { headers: this.getHeader() })
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    updateBook(book: Book) {
        return this.http.post('http://localhost:8080/books/editBook', book, { headers: this.getHeader() })
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    deleteBook(bookID: number) {
        const route = 'http://localhost:8080/books/deleteBook/' + bookID;
        return this.http.get(route);
    }

    private handleError(err) {
        return throwError(err);
    }

    private getHeader() {
        const headerProperties = {
            'Content-Type': 'application/json',
        };
        return new HttpHeaders(headerProperties);
    }

    routeToEdit(editBook: Book) {
        this.bookForEdit = editBook;
    }

    getToEdit() {
        return this.bookForEdit;
    }

}