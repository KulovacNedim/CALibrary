import { Component, OnInit } from '@angular/core';
import { manageService } from '../manageService.service' ; 
import { Router } from '@angular/router' ; 
import { Book } from '../book.model' ; 

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  oneBook: Book = new Book(); 
  badInfo: boolean = false ;
  public show:boolean = false;
  public buttonName:any = 'Show';
  
  constructor(private manageService: manageService, private router: Router) { }

  ngOnInit() {
  }

  toggle(){
    this.show = !this.show;
    if(this.show)  
    this.buttonName = "Hide";
  else
    this.buttonName = "Show";
  }

  testFunction(){
    document.getElementById('hCopy').onclick = showNumberOfCopies;

  function showNumberOfCopies(){
    document.getElementById('copyNo').style.visibility="visible"; 
   }
  }

  onConfirmAddingBook() {
    if ( this.manageService.checkInformations(this.oneBook) ) {
      this.badInfo = true ;
    } 
    else { 
    
    let bookID = this.manageService.checkIfBookExists(this.oneBook) ;  
    console.log(bookID); 
    if ( bookID  !== -1 ) { 
      console.log("Dodaje se broj kopija");
    this.manageService.increaseNumberOfCopies(bookID).toPromise().then( (result) => {
      this.router.navigate(['/loadBooks']);
     })
    }
    else {
     this.badInfo = false ; 
      console.log("Dodaje se nova knjiga");
        this.manageService.addBook(this.oneBook).toPromise().then((result)=> {
          //this.books.push(this.oneBook);
          this.oneBook = new Book() ;
          this.router.navigate(['/loadBooks']);
     });
    }
    }
  } 

}