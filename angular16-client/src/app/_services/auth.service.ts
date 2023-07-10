import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Auth, AuthResponse, Users } from '@app/_models';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject: BehaviorSubject<AuthResponse | null>;
  public auth: Observable<AuthResponse | null>;
  public token!: string;


  constructor(
    //public jwtHelper: JwtHelperService, 
    private router: Router, 
    private httpClient: HttpClient
    ) {
    this.authSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('auth')!));
    this.auth = this.authSubject.asObservable();
  }

  public get authValue() {
    return this.authSubject.value;
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl2}/auths/signin/`, { email, password })
      .pipe(map(auth => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('auth', JSON.stringify(auth));
        localStorage.setItem('token', JSON.stringify(auth['data']?.accessToken));
        this.authSubject.next(auth);
        return auth;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('auth');
    this.authSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(auth: Auth) {
    return this.httpClient.post(`${environment.apiUrl2}/auths/signup/`, auth);
  }

  getAll() {
    return this.httpClient.get<Users>(`${environment.apiUrl2}/auths/get-users/`);
  }

  getById(id: string) {
    return this.httpClient.get<Auth>(`${environment.apiUrl2}/auths/get-user/${id}`);
  }

  update(id: string, params: any) {
    /*return this.httpClient.put(`${environment.apiUrl2}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        
        if (id == this.userValue!.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('auth', JSON.stringify(auth));

          // publish updated user to subscribers
          this.authSubject.next(user);
        }
        return x;
      }));
    */
  }

  delete(id: string) {
    console.log(`${environment.apiUrl2}/auths/delete-user/${id}`);
    return this.httpClient.delete(`${environment.apiUrl2}/auths/delete-user/${id}`);
      /*.pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        //if (id == this.authValue?.id) {
        //  this.logout();
        //}
        return x;
      }));*/

  }
  /*
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  */
}
