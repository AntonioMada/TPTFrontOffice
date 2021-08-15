import { SidenavService } from './../../services/sidenav.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user:any;
  username = '';
  constructor(private authService:AuthService, private router:Router, private sideNavService:SidenavService) { }

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
    this.router.navigate(["/login"])
  }

  getInfo(){
    let iduser = localStorage.getItem('id_user')
    this.authService.getMe(iduser).subscribe((user) => {
      // console.log(user)
      // this.user = null
      this.user = user
      this.username = user.username;
    })
  }

  clickMenu() {
    console.log("par ici!")
    this.sideNavService.toggle();
  }
}
