import { QRCodeComponent } from './layouts/QRCode/QRCode.component';
import { ProfilUserComponent } from './pages/profil-user/profil-user.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SidenavService } from './services/sidenav.service';
import { ButtonPariComponent } from './layouts/button-pari/button-pari.component';
import { MenuModule } from './layouts/menu/menu.module';
import { MaterialModule } from './layouts/material/material.module';
import { InterceptorService } from './interceptors/interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';
// import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';

import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { ResultatsComponent } from './pages/resultats/resultats.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { CouponComponent } from './layouts/coupon/coupon.component';
import { CalendrierComponent } from './pages/calendrier/calendrier.component';
import { MY_DATE_FORMATS } from './utils/my-date-formats';
import { CdkColumnDef } from '@angular/cdk/table';
import { SportComponent } from './pages/sport/sport.component';
import { LeaguesComponent } from './pages/leagues/leagues.component';
import { ButtoncolorDirective } from './utils/buttoncolor.directive';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { QRCodeModule } from 'angularx-qrcode';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent, AccueilComponent, MatchsComponent, ResultatsComponent, StatistiquesComponent,
    InscriptionComponent, LoginComponent, SpinnerComponent, CouponComponent, CalendrierComponent, SportComponent,
    LeaguesComponent, ButtonPariComponent, PaymentComponent, ProfilUserComponent, QRCodeComponent,
    ButtoncolorDirective,
   ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, CommonModule, AppRoutingModule, CdkStepperModule,
    HttpClientModule,
    MaterialModule, MenuModule, MatChipsModule, MatBadgeModule, NgxSpinnerModule, QRCodeModule,
    // NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiNodeURL],
        disallowedRoutes: [environment.apiNodeURL+'/auth']
      }
    }),
    [LottieModule.forRoot({ player: playerFactory })],
  ],
  providers: [
    CdkColumnDef, DatePipe, SidenavService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    // { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA]}}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
