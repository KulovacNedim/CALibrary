import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TokenPayload, UserDetails } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: 0
  }
  user: UserDetails;

  showWarning = false;
  warning: string = "";

  constructor(private auth: AuthenticationService, private router: Router, private userService: UserService) { }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {

        var combe = this.auth.getUserDetails()


        this.userService.setUser(combe)


        this.router.navigateByUrl('/profile')
      },
      err => {
        console.error(err)
        this.showWarning = true;
        this.auth.setWarningMassage("Wrong credentials!");
      }
    )
  }
}
