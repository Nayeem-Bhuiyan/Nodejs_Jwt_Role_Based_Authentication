import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signUp', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  forgotPassword(email : string ){
    return this.http.post(AUTH_API+'forgot-password' , {email : email} , httpOptions );
  }

  resetPassword( newPassword : string , confirmedPassword : string , token : string){
    return this.http.post(AUTH_API+'resetPassword?token='+token , {
      newPassword : newPassword ,
       confirmedPassword : confirmedPassword
      } , httpOptions );

  }



}
