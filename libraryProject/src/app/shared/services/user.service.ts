import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookFields } from '../models/book.model';
import { UserDetails } from '../models/user.model';
import { EditProfileComponent } from 'src/app/edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserDetails;

  constructor(private http: HttpClient) { }



  public submitProfile(user: UserDetails): Observable<any> {
    return this.http.post(`http://localhost:8080/users/submitProfile`, user)
  }

  getUsers() {
    return this.http.get('http://localhost:8080/users/getUsers');
  }

  editUser(user_id: number) {
    return this.getUserById(user_id);
  }

  setUser(user1: UserDetails) {
    this.user = user1;
  }

  getUserById(user_id: number) {
    return this.http.get('http://localhost:8080/users/getUser/' + user_id);
  }
}