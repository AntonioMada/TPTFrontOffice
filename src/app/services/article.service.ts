import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from '../models/sport.model';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';
import { Match } from '../models/match.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article:Article[]
  uri = "https://tptnode.herokuapp.com/api/articles";
  constructor(private http:HttpClient) { }

  getArticle(page: number, limit: number,date:any):Observable<any>{
    return this.http.get<Article[]>(
      this.uri+ "?page=" + page + "&limit=" + limit
      );
  }
  deleteArticle(idarticle): Observable<any> {

      return this.http.delete(this.uri + "/" + idarticle);
  }
  addArticle(fd: FormData):Observable<any>{
    return this.http.post<Article[]>(this.uri,fd);
  }
  updateArticleWithUpload(fd: FormData): Observable<any> {
    return this.http.post(this.uri+"/file", fd);
  }

  updateArticleWithOutUpload(articles: Article): Observable<any> {
    return this.http.put(this.uri, articles);
  }

  getArticleById(id: number) {
    return this.http.get<Article>(this.uri + "/" + id);
  }
}
