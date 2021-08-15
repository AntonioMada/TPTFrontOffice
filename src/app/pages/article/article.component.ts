import { Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SportService } from './../../services/sports.service';
import { LeagueService } from './../../services/league.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles:Article[]
  page: any = {} 
  limit: any = {} 
  total: any
  sort:any={}
  totalPages: any 
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  constructor(
    private articeService:ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar:MatSnackBar
  ) {
    this.page = 1;
    this.limit = 5;
    this.sort = null;
   }

  ngOnInit() { 
    this.route.queryParams.subscribe((queryParams) => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 5;

      // this.getAssignments();
      this.getArticles();
    });
  }

  sportControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required); 
 
  search(sort){
    this.router.navigate(["/league"], {
     queryParams: {
       page:  1,
       limit: 10,
       sport:sort
     },
     });
    }
  getArticles(){  
    this.articeService.getArticle(this.page, this.limit, this.sort).subscribe(data => {
        this.articles = data.docs
        this.page = data.page;
        this.limit = data.limit;
        this.total = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
    });
  
  }
  deleteArticle(id) {
    // event = league à supprimer
    this.articeService.deleteArticle(id).subscribe((message) => {  
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/league"], {
        queryParams: {
          page:  this.page,
          limit: this.limit,
        },
        });
        
        this._snackbar.open(message.message, "ok");
    });
  }
  pagination() {
     this.router.navigate(["/league"], {
      queryParams: {
        page:  this.nextPage,
        limit: this.limit,
      },
      });
   }
   back() {
     this.router.navigate(["/league"], {
      queryParams: {
        page:  this.prevPage,
        limit: this.limit,
      },
      });
    
   }

}
