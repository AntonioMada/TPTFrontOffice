import { MatchPaginate } from './../models/matchPaginate.model';
import { LoaderService } from './loader.service';
import { MatchMostBet } from './../models/matchmostbet.model';
import { environment } from './../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, mergeMap, tap} from 'rxjs/operators';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  uriNode = environment.apiNodeURL

  constructor(private http:HttpClient) {
    // super();
  }

  getMatchMostPopulate():Observable<any>{
    return this.http.get<MatchPaginate[]>(this.uriNode + "/api/matchs/popular")
  }

  getMatchNotToBeMissed():Observable<any>{
    return this.http.get(this.uriNode + "/api/match/mostbet")
  }

  getArticleOfTheDay():Observable<any>{
    return this.http.get(this.uriNode + "/api/articles")
  }

}
