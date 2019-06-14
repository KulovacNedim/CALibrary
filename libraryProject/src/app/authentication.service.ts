import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  role_id: number
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  role_id : number
}



@Injectable()
export class AuthenticationService {
  
  private token: string

  constructor(private http: HttpClient, private router: Router) {}

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`http://localhost:2000/users/register`, user)
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post('http://localhost:2000/users/login', user)

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

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  public profile(): Observable<any> {
    return this.http.get(`http://localhost:2000/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

}