import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:User[]
  page: any = {} 
  limit: any = {} 
  total: any
  totalPages: any 
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  constructor(private router: Router,private userService:UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers()
  {    
    this.route.queryParams.subscribe((queryParams) => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.userService.getUser(this.page,this.limit).subscribe(data => {
        this.users = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.total = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
         this.nextPage = data.nextPage;
      });
    });
  }
  pagination() {
     this.router.navigate(["/user"], {
      queryParams: {
        page:  this.nextPage,
        limit: this.limit,
      },
      });
   }
   back() {
     this.router.navigate(["/user"], {
      queryParams: {
        page:  this.prevPage,
        limit: this.limit,
      },
      });
   }

   status(user) {
    this.userService.updateUser(user).subscribe(data => {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/user"], {
      queryParams: {
      page:  this.page,
      limit: this.limit,
     }
    });
   });
  }
}
