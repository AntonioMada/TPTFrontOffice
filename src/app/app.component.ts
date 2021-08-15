import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from './services/loader.service';
import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CouponComponent } from './layouts/coupon/coupon.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontoffice-angular-pari';
  nbcoupon:Observable<number>

  constructor(
    public loaderService:LoaderService,
    private _bottomSheet: MatBottomSheet,
    private globalService:GlobalService){
  }
  ngOnInit(){
    this.nbcoupon = this.globalService.getNombreCoupon()
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CouponComponent);
  }


}

