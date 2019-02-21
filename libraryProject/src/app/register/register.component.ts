import { Component } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication.service";
import { Router } from "@angular/router";
import { TokenPayload } from '../shared/models/user.model';

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role_id: 3
  };

  showWarning = false;
  warning: string = "";

  constructor(private auth: AuthenticationService, private router: Router) { }

  userRegister() {
    this.credentials.password = Math.random().toString(36).slice(-8);


    this.auth.userRegister(this.credentials).subscribe(
      (res) => {
        if (JSON.stringify(res).toLowerCase().search("warning") != -1) {
          this.showWarning = true;
          let warning = JSON.stringify(res);
          this.auth.setWarningMassage(warning.substr(1, warning.length - 2));
        } else {
          this.auth.sendMail(this.credentials).subscribe(
            err => {
              console.error(err)
            }
          )
          this.router.navigateByUrl('/')
        }
      },
      err => {
        console.error(err);
      }
    );


  }
}
