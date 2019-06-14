import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  details: UserDetails;
  userToEdit: UserDetails;
  userFromS: UserDetails

  constructor(private auth: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    
      // this.details = this.auth.getUserDetails();

   this.details = this.userService.user
this.userFromS = this.auth.getUserDetails()

  }

  submitProfile() {
    this.userService.submitProfile(this.details).toPromise().then((result) => {
      this.router.navigate(['/profile']);
    });
  }

}
