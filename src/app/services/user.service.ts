import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from '../models/sport.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  user:User[]
  uri = "https://tptnode.herokuapp.com/api/user";
  constructor(private http:HttpClient) { }

  getUser(page: number, limit: number):Observable<any>{
    return this.http.get<User[]>(
      this.uri+ "?page=" + page + "&limit=" + limit
      );
  }
  loginAdmin(user:any): Observable<any> {

      return this.http.post(this.uri + "/loginAdmin",user);
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(this.uri, user);
  }
}
