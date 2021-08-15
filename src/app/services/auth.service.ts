import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,public jwtHelper: JwtHelperService) {}

  login(login: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, iduser: string}>(environment.apiNodeURL+'/api/user/login', {username: login, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('id_user', result.iduser);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_user')
  }

  public get loggedIn(): boolean {
    // console.log(localStorage.getItem('access_token'))
    return (localStorage.getItem('access_token') !== null && localStorage.getItem('id_user') !== null);
  }

  getMe(iduser): Observable<any>{
    return this.http.post(environment.apiNodeURL+'/api/user/info', {iduser: iduser});
  }

  // isAdmin() : boolean{
  //   let token = localStorage.getItem('access_token');
  //   if(token){
  //     let user = this.jwtHelper.decodeToken(token);
  //     //console.log(user.role);
  //     if(user.role === "admin") return true;
  //   }
  //   return false;
  // }

  signin(nom: string, prenom: string, email: string, datenaissance: Date, adresse: string, motdepasse:string): Observable<any>{
    return this.http.post(environment.apiNodeURL+ '/api/users',
      {
        name:nom,
        username:prenom,
        email:email,
        birthday:datenaissance,
        address: adresse,
        password:motdepasse,
        isAdmin: false,
        isEnable: true
      }
    );
  }

}
