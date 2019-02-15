import { Component } from '@angular/core';
import { BookService } from './shared/services/book.service' ; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'libraryProject';

  constructor(private manageService : BookService ) {} 
}
