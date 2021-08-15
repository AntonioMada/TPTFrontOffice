import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { Paris } from '../models/paris.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  uriNode = environment.apiNodeURL
  // uriNode = environment.apiNodeURLlocal
  constructor(private httpClient:HttpClient) { }

  insertPaiement(amount:number, ref:string, iduser:number, bankcard:string, idparis:number, type:string){
    return this.httpClient.post(this.uriNode + "/api/payments",
      {
        amount: amount,
        ref: ref,
        iduser: iduser,
        bankcard: bankcard,
        idparis: idparis,
        type: type
      }
    );
  }

  insertPari(pari:Paris){
    // console.clear()
    // console.log(pari)
    return this.httpClient.post(this.uriNode + "/api/pari/details", pari);
  }


}
