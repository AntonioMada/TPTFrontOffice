import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/sport', title: 'Sports',  icon:'ni-trophy text-yellow', class: '' },
    { path: '/league', title: 'Leagues',  icon:'ni-trophy text-red', class: '' },
    { path: '/team', title: 'Teams',  icon:'ni ni-planet text-black', class: '' },
    { path: '/match', title: 'Match',  icon:'ni ni-world text-green', class: '' },
    { path: '/user', title: 'Users',  icon:'ni-key-25 text-info', class: '' },
    { path: '/article', title: 'Article',  icon:'ni-planet text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
    private _snackbar: MatSnackBar) { }

  ngOnInit() {
    if(localStorage.getItem('jwt')){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }else{
      this._snackbar.open("veillez vous connecter svp", "ok");
      this.router.navigate(['/login'])
    }
  }
}
