import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  warning: string = "fd";

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.warning = this.auth.getWarningMassage();
  }

}
