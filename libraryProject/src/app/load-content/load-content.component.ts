import { Component, OnInit } from '@angular/core';
import { Book} from '../book.model' ; 
import { BookService } from '../shared/services/book.service'; 
import { Routes, Router } from '@angular/router' ;  
import { AuthenticationService, UserDetails } from '../shared/services/authentication.service'

@Component({
  selector: 'app-load-content',
  templateUrl: './load-content.component.html',
  styleUrls: ['./load-content.component.css']
})
export class LoadContentComponent implements OnInit {
  editBook: Book = new Book() ; 
  books: Book[] = [];
  linkForDownload: string  ; 
  orderCriteria = 'A' ; 
  sortCriteria = 'Name' ; 
  details: UserDetails;

  base: string = "http://localhost:8080/api/file/";

  constructor(private manageService : BookService, private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.manageService.importBooks().subscribe((res: any[]) => {
      this.books = res;
      // this.manageService.saveBooks(this.books);// Z A S T O ///////////////////////////////////////////////////////////////////////////////////////////////////////
      this.sortByName();
    });
    this.details = this.auth.getUserDetails();
  }

  downloadLink(bookName: string) : string {
    return this.base + bookName
  }

  hideEditBtn(): boolean {
    return this.details.role_id === 3;
  }

  hideAddBtn(): boolean {
    return this.details.role_id === 3;
  }

  hideDeleteBtn(): boolean {
    return this.details.role_id === 2 || this.details.role_id === 3;
  }
  
   onAddBook() {
    this.router.navigate(['/addBook']);
   }
  

  onEditBook(index: number) {
    this.editBook = this.books[index];
    this.manageService.routeToEdit(this.editBook);
    this.router.navigate(['/editBook']);     
  }

  deleteBook(bookID: number, index: number) {
    this.manageService.deleteBook(bookID).toPromise().then((result) => {
      this.books.splice(index,1);
    });
  }



  onSort(sortCriteria: string) {
    this.sortCriteria = sortCriteria ; 
   if ( sortCriteria == 'Name' ) 
      this.sortByName();
   else if ( sortCriteria == 'Author' ) 
      this.sortByAuthor();
   else if ( sortCriteria == 'Subject' ) 
      this.sortBySubject();
  }

  onChangeOrder(orderCriteria: string) {
    this.orderCriteria = orderCriteria ;
    this.onSort(this.sortCriteria); 
  }

  sortByName() { 
    if ( this.orderCriteria === 'A')
       this.books.sort((a,b)=>a.name.localeCompare(b.name));
    else 
      this.books.sort((a,b)=>b.name.localeCompare(a.name));
  }

   sortByAuthor() { 
    if ( this.orderCriteria === 'A')
      this.books.sort((a,b)=>a.author.localeCompare(b.author));
    else 
      this.books.sort((a,b)=>b.author.localeCompare(a.author));
   }

   sortBySubject() { 
    if ( this.orderCriteria === 'A')
      this.books.sort((a,b)=>a.subject.localeCompare(b.subject));
    else 
      this.books.sort((a,b)=>b.subject.localeCompare(a.subject));
   }

}
