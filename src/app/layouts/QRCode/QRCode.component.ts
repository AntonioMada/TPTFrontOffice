import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-QRCode',
  templateUrl: './QRCode.component.html',
  styleUrls: ['./QRCode.component.scss']
})
export class QRCodeComponent{
  public myAngularxQrCode: string = null;
  constructor () {
    // assign a value
    // this.myAngularxQrCode = localStorage.getItem('id_user');
    this.myAngularxQrCode = localStorage.getItem('access_token');
  }


}
