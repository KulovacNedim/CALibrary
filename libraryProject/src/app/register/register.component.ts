import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html"
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


  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      (e) => {
        if(JSON.stringify(e).toLowerCase().search("warning") != -1) { //if response contain warning massage
          

        }else{
          this.auth.login(this.credentials).subscribe(
            () => {
             this.router.navigateByUrl('/profile')
            },
            err => {
              console.error(err)
              console.log("greskaaaaaa")
              
            }
          )
          
          
          
          
          //this.router.navigateByUrl("/profile");
        }
      },
      err => {
        console.error(err);
        console.log("User with that username already exist!");
      }
    );
  }
}
