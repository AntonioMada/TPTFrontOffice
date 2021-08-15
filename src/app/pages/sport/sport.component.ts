
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { SportService } from './../../services/sports.service';
import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/sport.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  sports:Sport[]
  page: any = {}
  limit: any = {}
  total: any
  totalPages: any
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  constructor(private router: Router,private sportsService:SportService,
    private route: ActivatedRoute,private _snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getSports();
  }

  getSports()
  {
    this.route.queryParams.subscribe((queryParams) => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 2;



      this.sportsService.getSports(this.page,this.limit).subscribe(data => {
        this.sports = data.docs;
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
  deleteSport(id) {
    // event = sport à supprimer

    this.sportsService.deleteSport(id).subscribe((message) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/sport"], {
        queryParams: {
          page:  this.page,
          limit: this.limit,
        },
        });
        this._snackBar.open(message.message, "ok");
    });
  }
  pagination() {
     this.router.navigate(["/sport"], {
      queryParams: {
        page:  this.nextPage,
        limit: this.limit,
      },
      });
   }
   back() {
     this.router.navigate(["/sport"], {
      queryParams: {
        page:  this.prevPage,
        limit: this.limit,
      },
      });

   }

}
