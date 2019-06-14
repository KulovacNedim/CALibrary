import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserDetails } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.css']
})
export class LoadUsersComponent implements OnInit {

  users: UserDetails[] = [];
  user: UserDetails;
  userToEdit: UserDetails;
  role: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any[]) => {
      this.users = res;
      // this.sortByName();
    });
  }




  editUser(user_id: number) {
    
    this.userService.editUser(user_id).subscribe(
      (user) => {
        this.userToEdit = <UserDetails>user


        this.userService.setUser(this.userToEdit)

        this.router.navigate(['/editProfile']);

        // this.userService.editUser(this.userToEdit);
      }
    );
  }
}