import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Match } from "../models/match.model";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  uri = "https://tptnode.herokuapp.com/api/";
  localuri= "http://localhost:8010/api/";
  constructor(private http: HttpClient) {}

  getTresorerie(): Observable<any> {
    return this.http.get<any>(this.uri + "solde/site");
  }
  pariencours(): Observable<any> {
    return this.http.get<any>(this.uri + "pari/details/notpayed");
  }
  userplusactif(): Observable<any> {
    return this.http.post<any>(this.uri + "user/investment", 5);
  }
  matchsMostBet(): Observable<any> {
    return this.http.get<any>(this.uri + "match/mostbet");
  }
  paris(): Observable<any> {
    return this.http.get<any>(this.uri + "paris");
  }
  paristat(): Observable<any> {
    return this.http.get<any>(this.uri + "pari/statistic");
  }
  pariparmois(year):Observable<any>{
    return this.http.get(this.uri + "pari/mois/"+year);
  }
}

