import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string
  password:string
  error=""
 
  constructor(private userService:UserService,private router: Router,
    private route: ActivatedRoute,) {}


  ngOnInit() {
  }
  login(){
    let user=new User();
    user.username=this.username
    user.password=this.password
    this.userService.loginAdmin(user).subscribe(
      res => {
        this.router.navigate(["/dashboard"]);
        localStorage.setItem('jwt',res.token );
    },
      err => {this.error=err.error}
    );
  }
}
