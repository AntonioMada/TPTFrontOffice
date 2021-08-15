import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  uriNode = environment.apiNodeURL
  constructor(private http:HttpClient) { }

  getLeagueBySportId(idsport):Observable<any>{
    return this.http.get(this.uriNode + "/api/leagues", {
      params: {
        id_sport : idsport
      }
    });
  }
}
