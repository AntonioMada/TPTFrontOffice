import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private dataSource = new BehaviorSubject<Coupon[]>([]);
  // private miseTotal = new BehaviorSubject<number>(0);

  constructor() { }

  addCoupon(match:Match,idteam:number, team:string, quote:number){
    // console.log(match)
    // console.log(idteam)
    const coupon = this.dataSource.value;
    coupon.push({match, idteam, team, quote, amount:0});
    this.dataSource.next(coupon);
  }

  removeCoupon(coupon: Coupon){
    // let coupon = this.dataSource.value;
    this.dataSource.value.forEach((value,index) => {
      if(value == coupon) this.dataSource.value.splice(index,1)
      console.log(coupon);
    })
  }

  updateMontantCoupon(coupon:Coupon, montant:number){
    let coupons = this.dataSource.value
    const indice = coupons.indexOf(coupon);
    let coupontemp = coupons[indice]
    coupontemp.amount = montant;
    // console.log("indice = "+indice)
    // console.log(coupontemp)
  }

  getGainTotal(){
    let total:number = 0;
    let coupons = this.dataSource.value
    coupons.forEach(coupon => {
      total += coupon.amount*coupon.quote
    });
    console.log("gain total = "+ total)
    return total;
  }

  getMiseTotal(){
    let total:number = 0;
    let coupons = this.dataSource.value
    coupons.forEach(coupon => {
      total = total + Number(coupon.amount);
    });
    console.log("Mise total = "+ total)
    return total;

  }

  getCoupon():Observable<Coupon[]>{
    console.log("getCoupon()")
    return this.dataSource.asObservable();
  }

  getNombreCoupon(){
    return this.dataSource.getValue().length;
  }
}
