import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router';
import { League } from 'src/app/models/league.model';
import { Team } from 'src/app/models/team.model';
import { LeagueService } from 'src/app/services/league.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  leagues:League[]
  teams:Team[]
  page: any = {} 
  limit: any = {} 
  total: any
  totalPages: any 
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  sort:any={}
  constructor(
    private leagueService:LeagueService,
    private teamService:TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar:MatSnackBar
  ) { 
    this.page = 1;
    this.limit = 5;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
    this.page = +queryParams.page || 1;
    this.limit = +queryParams.limit || 5;
    this.sort = queryParams.league ;
    this.getLeagues();
    this.getTeams();
    });
  }

  getLeagues(){  
    this.leagueService.getLeague(1,5,null).subscribe(data => {
        this.leagues = data.docs
    });
  
  }  
  search(sort){
    if(sort){
      this.router.navigate(["/team"], {
      queryParams: {
        page:  1,
        limit: 5,
        league:sort.id
      },
      });
    }else{
      this.router.navigate(["/team"], {
        queryParams: {
          page:  1,
          limit: 5
        },
        });
      }
    }
  getTeams(){  
    this.teamService.getTeams(this.page, this.limit,this.sort).subscribe(data => {

        this.teams = data.docs
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
  deleteTeam(id) {
    this.teamService.deleteTeam(id).subscribe((message) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/team"], {
        queryParams: {
          page:  this.page,
          limit: this.limit,
        },
        });
        this._snackbar.open(message, "ok");
    });
  }
  pagination() {
     this.router.navigate(["/team"], {
      queryParams: {
        page:  this.nextPage,
        limit: this.limit,
      },
      });
    
   }
   back() {
     this.router.navigate(["/team"], {
      queryParams: {
        page:  this.prevPage,
        limit: this.limit,
      },
      });
    
   }
}
