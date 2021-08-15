import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  updateUser(id:number, email: string, name:string, username:string, address:string, birthday:Date, password: string): Observable<boolean> {
    return this.http.put<any>(environment.apiNodeURL+'/api/user/update/profil',
      {
        id: id,
        email: email,
        name: name,
        username: username,
        address: address,
        birthday: birthday,
        password: password
      }
    );
  }
}

