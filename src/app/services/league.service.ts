import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from '../models/sport.model';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  league:League[]
  uri = "https://tptnode.herokuapp.com/api/leagues";
  constructor(private http:HttpClient) { }

  getLeague(page: number, limit: number,sport:number):Observable<any>{
    return this.http.get<League[]>(
      this.uri+ "?page=" + page + "&limit=" + limit+"&id_sport="+sport
      );
  }
  deleteLeague(idleague): Observable<any> {

      return this.http.delete(this.uri + "/" + idleague);
  }
  addLeague(fd: FormData):Observable<any>{
    return this.http.post<Sport[]>(this.uri,fd);
  }
  updateLeagueWithUpload(fd: FormData): Observable<any> {
    return this.http.post(this.uri+"/file", fd);
  }

  updateLeagueWithOutUpload(leagues: League): Observable<any> {
    return this.http.put(this.uri, leagues);
  }

  getLeagueById(id: number) {
    return this.http.get<League>(this.uri + "/" + id);
  }
}
