import { User } from './../models/user.model';
import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { Match } from '../models/match.model';
// import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private dataSource = new BehaviorSubject<Coupon[]>([]);
  private nbCoupon = new BehaviorSubject<number>(0);
  private profil = new BehaviorSubject<User>(null);

  constructor() { }

  addUser(user){
    const profil = this.profil.value;
    this.profil.next(user);
  }

  getUserProfil(){
    console.log("getUserProfil()")
    return this.profil.asObservable();
  }

  removeUserProfil(){
    console.log("removeUserProfil()")
    // this.profil.value.forEach((value,index) => {
    //   if(value.id == id) this.profil.value.splice(index,1)
    //   console.log(value);
    // })
    this.profil.next(null);
  }
  addCoupon(match:Match,idteam:number, team:string, quote:number){
    // console.log(match)
    // console.log(idteam)
    const coupon = this.dataSource.value;
    let compteur = this.nbCoupon.value;
    coupon.push({match, idteam, team, quote, amount:0});
    this.dataSource.next(coupon);
    this.nbCoupon.next(compteur++);
  }

  removeCoupon(coupon: Coupon){
    // let coupon = this.dataSource.value;
    let compteur = this.nbCoupon.value;
    this.dataSource.value.forEach((value,index) => {
      if(value == coupon) this.dataSource.value.splice(index,1)
      console.log(coupon);
    })
    this.nbCoupon.next(compteur--);
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
    console.clear();
    console.log("taille dataSource = "+this.dataSource.getValue().length)
    const count = of(this.dataSource.getValue().length);
    return count;
    // console.log(this.nbCoupon)
    // return this.nbCoupon.asObservable();
  }
}
