import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from '../models/sport.model';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  sports:Sport[]
  // uri = "https://tptnode.herokuapp.com/api/sports";
  uri = "https://tptnode.herokuapp.com/api/sports";
  constructor(private http:HttpClient) { }

  updateSportWithUpload(fd: FormData): Observable<any> {
    return this.http.post(this.uri+"/file", fd);
  }

  updateSportWithOutUpload(sport: Sport): Observable<any> {
    return this.http.put(this.uri, sport);
  }

  getSportById(id: number) {
    return this.http.get<Sport>(this.uri + "/" + id);
  }

  getSports(page:number,limit:number):Observable<any>{
    return this.http.get<Sport[]>(

      this.uri+ "?page=" + page + "&limit=" + limit
    );
  }
  addSport(fd: FormData):Observable<any>{
    return this.http.post<Sport[]>(this.uri,fd);
  }
  deleteSport(idsport): Observable<any> {

      return this.http.delete(this.uri + "/" + idsport);
  }
}
