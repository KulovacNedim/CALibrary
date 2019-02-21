import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../shared/services/book.service';
import { BookFields } from '../shared/models/book.model';


@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  editingBook: BookFields;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.editingBook = this.bookService.getToEdit();
  }

  onSubmitEdit() {
    this.bookService.updateBook(this.editingBook).toPromise().then((result) => {
      this.router.navigate(['/loadBooks']);
    });
  }


}
