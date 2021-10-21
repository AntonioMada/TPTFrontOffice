import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-QRCode',
  templateUrl: './QRCode.component.html',
  styleUrls: ['./QRCode.component.scss']
})
export class QRCodeComponent{
  public myAngularxQrCode: string = null;
  public infoUser:any = {}
  constructor (private authService:AuthService) {
    // assign a value
    // this.myAngularxQrCode = localStorage.getItem('id_user');
    // this.myAngularxQrCode = localStorage.getItem('access_token');
    this.infoUser = authService.getMe(localStorage.getItem('id_user'))
    this.myAngularxQrCode = 'http://'+this.infoUser.username+' '+this.infoUser.password;
  }


}
