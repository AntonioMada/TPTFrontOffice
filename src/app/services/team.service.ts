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
export class TeamService {
 uri = "https://tptnode.herokuapp.com/api/teams";
 geocoding="https://us1.locationiq.com/v1/reverse.php?key=pk.dc3bbee66fee5d729f7e6c3794ac3349&format=json";

 // uri = "https://tptnode.herokuapp.com/api/teams";
  constructor(private http:HttpClient) { }

  getTeams(page:any,limit:any,sort:number):Observable<any>{
    return this.http.get<Team[]>(
      this.uri+ "?page=" + page + "&limit=" + limit+"&id_league=" + sort
    );
  }
  deleteTeam(idteam): Observable<any> {

      return this.http.delete(this.uri + "/" + idteam);
  }
  
  addTeam(fd: FormData):Observable<any>{
    return this.http.post<Team[]>(this.uri,fd);
  }
  updateTeamWithUpload(fd: FormData): Observable<any> {
    return this.http.post(this.uri+"/file", fd);
  }

  updateTeamWithOutUpload(teams: Team): Observable<any> {
    return this.http.put(this.uri, teams);
  }

  getTeamById(id: number) {
    return this.http.get<Team>(this.uri + "/" + id);
  }
  reverseGeocoding(latlong){
    return this.http.get<any>(this.geocoding + "&lat="+latlong[0]+"&lon="+latlong[1]);
  }
}
