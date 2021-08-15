import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  constructor(private http:HttpClient) { }

  getResultatMatch(iduser:number, max:number, offset:number):Observable<any>{
    return this.http.post(environment.apiNodeURL+ "/api/historic",{iduser: iduser, max: max, offset: offset});
  }
}
