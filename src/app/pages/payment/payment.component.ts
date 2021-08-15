import { SnackbarService } from './../../services/snackbar.service';
import { PaymentService } from './../../services/payment.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.model';
import { GlobalService } from 'src/app/services/global.service';
import { Paris } from 'src/app/models/paris.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  montantTotal:number;
  coupons:Observable<Coupon[]>;
  dateNow:string;
  cartebancaire: string;
  type: string;

  foods: Food[] = [
    {value: 'Paypal', viewValue: 'Paypal'},
    {value: 'Visa', viewValue: 'VisaCard'},
    {value: 'Bitcoin', viewValue: 'Bitcoin'}
  ];

  constructor(
    private globalService:GlobalService,
    private datePipe:DatePipe,
    private paymentService:PaymentService,
    private snackbarService:SnackbarService) { }

  ngOnInit() {
    this.coupons = this.globalService.getCoupon();
    this.montantTotal = this.globalService.getMiseTotal();
    this.getDate()
  }

  changeTypePaiement(value){
    this.type = value
  }

  validerPaiement(){
    const iduser = Number(localStorage.getItem('id_user'));
    const ref = "REF"+iduser+"-"+ new Date().getMilliseconds();
    let idparis = 0;
    const pari = this.getFormatPari(iduser);
    this.paymentService.insertPari(pari).subscribe((result) => {
      // console.clear();
      // console.log("this.montantTotal = " + this.montantTotal)
      // console.log("ref = " + ref)
      // console.log("iduser = " + iduser)
      // console.log("this.cartebancaire = " + this.cartebancaire)
      // console.log("idparis = " + idparis )
      // console.log("this.type = " +  this.type )
      // console.log(result)
      idparis = result[0].paris.id
      this.paymentService.insertPaiement(this.montantTotal, ref, iduser, this.cartebancaire, idparis, this.type).subscribe((res) => {
        // console.clear();
        console.log(res)
      });
      this.snackbarService.openSuccessSnackBar("Le paiement est un succès!")
    }, (error) =>{
      this.snackbarService.openErrorSnackBar("Le paiement est un échec!")
    });
  }

  getDate(){
    const now = new Date()
    this.dateNow = this.datePipe.transform(now, 'yyyy-MM-dd')
    console.log(this.dateNow)
  }

  getFormatPari(iduser): Paris{
    let paris = new Paris();
    let pariDetailsArray = []
    paris.iduser = iduser;
    paris.datepari = this.dateNow;
    paris.totalamount = this.montantTotal;
    paris.ispayed = true;
    this.coupons.subscribe((coupon) => {
      coupon.forEach((value) => {
        pariDetailsArray.push({
          idmatch: value.match.id,
          amount: value.amount,
          idteamparie: value.idteam,
          amountwithquote: Number(value.amount)*Number(value.quote),
          isfinished: false,
          dateinsert: paris.datepari,
          type: "pari_gagnant"
        })
      })
    });
    paris.pariDetails = pariDetailsArray;
    return paris
  }
}
