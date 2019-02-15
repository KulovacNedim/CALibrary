import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ; 
import { AuthenticationService, TokenPayload } from '../shared/services/authentication.service';

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

  showWarning = false;
  warning: string = "";

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
       this.router.navigateByUrl('/loadBooks')
      },
      err => {
        console.error(err)
        this.showWarning = true;
        this.auth.setWarningMassage("Wrong credentials!");
      }
    )
  }
}
