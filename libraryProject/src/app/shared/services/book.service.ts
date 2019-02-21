import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookFields } from '../models/book.model';


@Injectable()
export class BookService {

    bookForEdit: BookFields;
    booksForLoad: BookFields[] = [];

    constructor(private http: HttpClient) {
    }

    importBooks() {
        return this.http.get('http://localhost:8080/books/getBooks');
    }

    addBook(book: BookFields) {
        return this.http.post('http://localhost:2000/add', book, { headers: this.getHeader() })
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    updateBook(book: BookFields) {
        return this.http.post('http://localhost:8080/books/editBook', book, { headers: this.getHeader() })
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    deleteBook(bookID: number) {
        const route = 'http://localhost:8080/books/deleteBook/' + bookID;
        return this.http.get(route);
    }

    deleteSelectedBooks(checked: number[]) {
        return this.http.post('http://localhost:8080/books/deleteSelectedBooks', checked)
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    downloadSelectedBooks(checkedFileNames: string[]) {
        return this.http.post('http://localhost:8080/api/file/downloadSelectedBooks', checkedFileNames)
            .pipe(
                catchError((error) => this.handleError(error)));
    }

    private handleError(err) {
        return throwError(err);
    }

    private getHeader() {
        const headerProperties = {
            'Content-Type': 'application/json',
            responseType: 'text'
        };
        return new HttpHeaders(headerProperties);
    }

    routeToEdit(editBook: BookFields) {
        this.bookForEdit = editBook;
    }

    getToEdit() {
        return this.bookForEdit;
    }

}