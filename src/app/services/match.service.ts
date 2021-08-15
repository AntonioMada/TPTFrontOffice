import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  uriNode = environment.apiNodeURL

  constructor(private http:HttpClient) { }

  getTop20():Observable<any>{
    return this.http.get(this.uriNode + "/api/match/mostbet")
  }

  getMatchByDate(date):Observable<any>{
    return this.http.get(this.uriNode + "/api/matchs", {params:{ date: date} })
  }


}
