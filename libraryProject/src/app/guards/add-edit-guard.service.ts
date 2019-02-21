import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthenticationService } from '../shared/services/authentication.service'
import { BookService } from '../shared/services/book.service';

@Injectable()
export class AddEditGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.auth.getUserDetails().role_id === 4) {
      this.router.navigateByUrl('/loadBooks')
      return false
    }
    
    return true
  }
}