import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from '../shared/services/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../shared/services/authentication.service';
import { BookFields } from '../shared/models/book.model';
import { UserDetails } from '../shared/models/user.model';


@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  credentials: BookFields = {
    id: 0,
    name: "",
    author: "",
    subject: "",
    publishingYear: 0,
    type: '',
    numberOfCopies: 0,
    content: '',
    created_by: 0
  };

  details: UserDetails;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };


  oneBook: BookFields;
  badInfo = false;

  constructor(private auth: AuthenticationService, private router: Router, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.credentials.created_by = this.details.id;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.credentials.content = this.selectedFiles[0].name;
  }

  upload() {

    // upload to server
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;

    // make record in db
    this.uploadService.registerBook(this.credentials).subscribe(
      err => {
        console.error(err);
      }
    );
  }


















  testFunction() {
    document.getElementById('hCopy').onclick = showNumberOfCopies;

    function showNumberOfCopies() {
      document.getElementById('copyNo').style.visibility = "visible";
    }
  }

  // onConfirmAddingBook() {
  //   if ( this.manageService.checkInformations(this.oneBook) ) {
  //     this.badInfo = true ;
  //   } 
  //   else { 

  //   let bookID = this.manageService.checkIfBookExists(this.oneBook) ;  
  //   console.log(bookID); 
  //   if ( bookID  !== -1 ) { 
  //     console.log("Dodaje se broj kopija");
  //   this.manageService.increaseNumberOfCopies(bookID).toPromise().then( (result) => {
  //     this.router.navigate(['/loadBooks']);
  //    })
  //   }
  //   else {
  //    this.badInfo = false ; 
  //     console.log("Dodaje se nova knjiga");
  //       this.manageService.addBook(this.oneBook).toPromise().then((result)=> {
  //         //this.books.push(this.oneBook);
  //         this.oneBook = new Book() ;
  //         this.router.navigate(['/loadBooks']);
  //    });
  //   }
  //   }
  // } 

}