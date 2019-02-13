import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AddEditGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    if (this.auth.getUserDetails().role_id === 3) {
      this.router.navigateByUrl('/loadBooks')
      return false
    }
    
    return true
  }
}