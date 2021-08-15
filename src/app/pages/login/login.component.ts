import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private animation:AnimationItem
  username: string;
  password: string;
  error: string;
  options: AnimationOptions = {
    path: '/assets/lottie/18028-sports-loader.json',
  };
  constructor(private ngZone:NgZone, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    // this.ngZone.runOutsideAngular(() => {
      // this.animation.play()
    //   setTimeout(() => {
    //     this.animation.destroy();
    //   }, 5000)
    // })


    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    if(this.authService.loggedIn) this.router.navigate(["/accueil"]);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animation = animationItem
  }


  login(){
    this.authService.login(this.username,this.password).subscribe(
      result => {
        this.router.navigate(["/accueil"])
      },
      err => this.error = err.error || "Une erreur est survenue"
    );
  }
}
