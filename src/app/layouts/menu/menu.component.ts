import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { SidenavService } from './../../services/sidenav.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user:any;
  profil$: Observable<User>;
  constructor(private authService:AuthService, private router:Router, private sideNavService:SidenavService, private globalService:GlobalService) { }

  ngOnInit() {
  }
  isLoggedIn(){
    const loggedIn = this.authService.loggedIn;
    if(this.user == null) this.getInfo()
    // console.log(loggedIn);

    return loggedIn;
  }

  logout(){
    this.authService.logout();
    const id_user = Number(localStorage.getItem("id_user"))
    this.globalService.removeUserProfil()
    this.router.navigate(["/login"])
  }

  getInfo(){
    this.profil$ = this.globalService.getUserProfil()
    // console.log("------------------------------------")
    // this.profil$.subscribe(user => console.log(user))
  }

  clickMenu() {
    console.log("par ici!")
    this.sideNavService.toggle();
  }
}
