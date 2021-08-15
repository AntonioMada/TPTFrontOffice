import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable, of } from 'rxjs';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Coupon } from 'src/app/models/coupon.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit{
  misetotal:number;
  gainpotentiel:number;
  coupons:Observable<Coupon[]>;


  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CouponComponent>,
    private globalService:GlobalService,
    private router:Router) {}

  ngOnInit() {
    this.coupons = this.globalService.getCoupon();
    this.calculGainPotentiel()
    this.calculMiseTotal()
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  removePari(coupon:Coupon){
    this.globalService.removeCoupon(coupon)
    this.calculGainPotentiel()
    this.calculMiseTotal()
  }

  onChangeMontant(event:any, coupon:Coupon){
    const amount = event.target.value;
    this.globalService.updateMontantCoupon(coupon, amount)
    this.calculGainPotentiel()
    this.calculMiseTotal()
  }

  calculMiseTotal(){
    this.misetotal = this.globalService.getMiseTotal()
  }

  calculGainPotentiel(){
    this.gainpotentiel = this.globalService.getGainTotal()
  }

  checkPaiement():boolean{
    let result:boolean = false
    this.coupons.subscribe(coupon => {
      if(coupon.length > 0) result = true;
    });
    return result;
  }

  payer(){
    this.router.navigate(['/paiement'])
  }

}
