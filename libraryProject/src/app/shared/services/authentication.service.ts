import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { UserDetails, TokenPayload, TokenResponse } from '../models/user.model';


@Injectable()
export class AuthenticationService {

  private token: string
  private warning: string = ""

  constructor(private http: HttpClient, private router: Router) { }

  setWarningMassage(setWarningMassage: string) {
    this.warning = setWarningMassage
  }
  getWarningMassage() {
    return this.warning
  }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public userRegister(user: TokenPayload): Observable<any> {
    return this.http.post(`http://localhost:8080/users/register`, user)
  }

  public sendMail(user: TokenPayload): Observable<any> {
    return this.http.post(`http://localhost:8080/users/sendMail`, user)

  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post('http://localhost:8080/users/login', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    
    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`http://localhost:8080/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
