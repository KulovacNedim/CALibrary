import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service'
import { UserDetails } from '../shared/models/user.model';
import { BookFields } from '../shared/models/book.model';
import { pipeBind1 } from '@angular/core/src/render3';


@Component({
  selector: 'app-load-content',
  templateUrl: './load-content.component.html',
  styleUrls: ['./load-content.component.css']
})
export class LoadContentComponent implements OnInit {

  editBook: BookFields;
  books: BookFields[] = [];
  linkForDownload: string;
  orderCriteria = 'A';
  sortCriteria = 'Name';
  details: UserDetails;

  checked: number[] = [];
  checkedFileNames: string[] = [];

  base: string = "http://localhost:8080/api/file/";

  constructor(private bookService: BookService, private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.bookService.importBooks().subscribe((res: any[]) => {
      this.books = res;
      this.sortByName();
    });
    this.details = this.auth.getUserDetails();
  }


 


  downloadSelectedBooks() {
    
    
    // var a = document.getElementById("m")
    // a.setAttribute('href', 'http://localhost:8080/api/file/The Agile Samurai pdf ( PDFDrive.com ).pdf";
    // a.click();
    
  //   for (let index = 0; index < this.checkedFileNames.length; index++) {
      
     
  //     const element = this.checkedFileNames[0];
  //   var a = document.getElementById("m");

  //   a.setAttribute('href', element);

    
  //   a.click();

  //   console.log("pauza");
    
    
  // }
  
    
    
    this.bookService.downloadSelectedBooks(this.checkedFileNames).subscribe(
      ()=>
      console.log("skinuo")
    );





    // for (let entry of this.checkedFileNames) {
    //   this.downloadLink(entry)

    //   fetch('"'+this.downloadLink(entry)+'"')
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (myJson) {
    //       console.log(JSON.stringify(myJson));
    //     });
    // }

  }

  deleteSelectedBooks() {
    this.bookService.deleteSelectedBooks(this.checked).subscribe((res) => {

      this.bookService.importBooks().subscribe((res: any[]) => {
        this.books = res;
        this.sortByName();
      });
    });
  }

  markBook(bookId: number, bookContent: string) {
    let operation = this.checkId(this.checked, bookId);

    if (operation < 0) {
      this.checked.push(bookId)
      this.checkedFileNames.push(this.base+bookContent)
    } else {
      this.checked.splice(operation, 1);
      this.checkedFileNames.splice(operation, 1);
    }
  }

  checkId(checked: number[], bookId: number): number {
    return checked.indexOf(bookId);
  }

  downloadLink(bookName: string): string {
    return this.base + bookName
  }

  hideEditBtn(created_by: number): boolean {
    return this.details.role_id === 1 || this.details.id === created_by;
  }

  hideAddBtn(): boolean {
    return this.details.role_id === 1 || this.details.role_id === 2 || this.details.role_id === 3;
  }

  hideDeleteBtn(created_by: number): boolean {
    return this.details.role_id === 1 || this.details.id === created_by;
  }

  addBook() {
    this.router.navigate(['/addBook']);
  }

  editMyBook(index: number) {
    this.editBook = this.books[index];
    this.bookService.routeToEdit(this.editBook);
    this.router.navigate(['/editBook']);
  }

  deleteBook(bookID: number, index: number) {
    this.bookService.deleteBook(bookID).toPromise().then((result) => {
      this.books.splice(index, 1);
    });
  }

  sort(sortCriteria: string) {
    this.sortCriteria = sortCriteria;
    if (sortCriteria == 'Name')
      this.sortByName();
    else if (sortCriteria == 'Author')
      this.sortByAuthor();
    else if (sortCriteria == 'Subject')
      this.sortBySubject();
  }

  changeOrder(orderCriteria: string) {
    this.orderCriteria = orderCriteria;
    this.sort(this.sortCriteria);
  }

  sortByName() {
    if (this.orderCriteria === 'A')
      this.books.sort((a, b) => a.name.localeCompare(b.name));
    else
      this.books.sort((a, b) => b.name.localeCompare(a.name));
  }

  sortByAuthor() {
    if (this.orderCriteria === 'A')
      this.books.sort((a, b) => a.author.localeCompare(b.author));
    else
      this.books.sort((a, b) => b.author.localeCompare(a.author));
  }

  sortBySubject() {
    if (this.orderCriteria === 'A')
      this.books.sort((a, b) => a.subject.localeCompare(b.subject));
    else
      this.books.sort((a, b) => b.subject.localeCompare(a.subject));
  }

}
