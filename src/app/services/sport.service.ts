import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uriNode = environment.apiNodeURL
  constructor(private http:HttpClient) { }

  getSports():Observable<any>{
    return this.http.get(this.uriNode + "/api/sports")
  }
}
