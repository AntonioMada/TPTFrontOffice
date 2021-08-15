import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Match } from "../models/match.model";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  match: Match[];
  uri = "https://tptnode.herokuapp.com/api/matchs";
  uridontfinish ="https://tptnode.herokuapp.com/api/matchs/dontfinish"
  urifinish ="https://tptnode.herokuapp.com/api/matchs/finish"
  urilocal="https://tptnode.herokuapp.com/api/matchs"
  constructor(private http:HttpClient) { }

  getMatchs(page:number,limit:number,team:number):Observable<any>{
    return this.http.get<Match[]>(
      
      this.urilocal+"?page="+page+"&limit="+limit+"&id_team="+team
    );
  }
  getMatchFinish(page:number,limit:number,team:number):Observable<any>{
    return this.http.get<Match[]>(
      
      this.urifinish+"?page="+page+"&limit="+limit+"&id_team="+team
    );
  }
  getMatchDontFinish(page:number,limit:number,team:number):Observable<any>{
    return this.http.get<Match[]>(
      
      this.uridontfinish+"?page="+page+"&limit="+limit+"&id_team="+team
    );
  }
  getMatch(id: number): Observable<any> {
    return this.http.get<Match>(this.uri + "/" + id);
  }
  
  deleteMatch(id: number): Observable<any> {
    return this.http.delete(this.uri + "/" + id);
  }
  addMatch(match:Match): Observable<any> {

    return this.http.post(this.urilocal , match);
  }
  
  finaliseMatch(id,score_1,score_2,idteamwinner): Observable<any> {
    return this.http.put(this.urilocal + "/mvtfinished" , { idmatch: id , score_1: score_1 , score_2: score_2 , idteamwinner: idteamwinner });
  }
}
