import { Component } from '@angular/core'
import { AuthenticationService } from '../shared/services/authentication.service'
import { UserDetails } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails
  userToEdit: UserDetails

  currentUserRole: string;

  constructor(private auth: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.userToEdit = this.userService.user
    // this.userService.profile().subscribe(
    //   user => {
    //     this.details = user

        if (this.userToEdit.role_id == 1) {
          this.currentUserRole = "Administrator"
        } if (this.userToEdit.role_id == 2) {
          this.currentUserRole = "Teacher"
        } else if (this.userToEdit.role_id == 1) {
          this.currentUserRole = "Author"
        } else {
          this.currentUserRole = "Student"
        }
    //   },
    //   err => {
    //     console.error(err)
    //   }
    // )


  }

  onEditProfile(user_id:number) {

    

    this.userService.editUser(user_id).subscribe(
      (user) => {
        this.userToEdit = <UserDetails>user


        this.userService.setUser(this.userToEdit)

        this.router.navigate(['/editProfile']);

        // this.userService.editUser(this.userToEdit);
      }
    );


    // this.router.navigate(['/editProfile']);
  }

  
}
