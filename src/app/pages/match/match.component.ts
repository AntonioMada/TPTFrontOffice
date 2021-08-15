import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league.model';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from "@angular/router";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatchsDialogue } from './match-dialogue/match-dialogue.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  matchsFinished:Match[]
  matchsDontFinished:Match[]
  teams1:Team[]
  teams2:Team[]  
  page: any = {} 
  limit: any = {} 
  total: any
  totalPages: any 
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  team:any={}
  date:any={}
  score:any={}
  matchDialogue:MatchsDialogue
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private teamService:TeamService,
    private matchService:MatchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.page = 1;
    this.limit = 5;
  }

  ngOnInit() {
     this.route.queryParams.subscribe((queryParams) => {
    this.page = +queryParams.page || 1;
    this.limit = +queryParams.limit || 5;
    this.team = queryParams.team;
    this.getMatchsFinished(this.team);
    this.getMatchsDontFinished(this.team);
    this.getTeams(4);
  });
  }

  getMatchsFinished(team:number){  
    this.matchService.getMatchFinish(this.page,this.limit,team).subscribe((data) => {
        this.matchsFinished = data.docs
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
  getMatchsDontFinished(team:number){  
    this.matchService.getMatchDontFinish(this.page,this.limit,team).subscribe((data) => {
        this.matchsDontFinished = data.docs
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
  getTeams(id){  
    this.teamService.getTeams(1,1000,null).subscribe(data => {
  
        this.teams1 = data.docs
    });
  
  }
  getTeam(event){   
    if(event!= undefined){  
    this.router.navigate(["/match"], {
      queryParams: {
        page:  1,
        limit: 10,
        team:event
      },
      });
    }else{
      this.router.navigate(["/match"], {
        queryParams: {
          page:  1,
          limit: 10
        },
        });
    }
  }
  
  deletematch(id) {
    // event = league à supprimer
    this.matchService.deleteMatch(id).subscribe((message) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/match"], {
        queryParams: {
          page:  this.page,
          limit: this.limit,
        },
      });
      this._snackBar.open(message, "ok");
    });
  }
  pagination() {
     this.router.navigate(["/match"], {
      queryParams: {
        page:  this.nextPage,
        limit: this.limit,
      },
      });
   }
   back() {
     this.router.navigate(["/match"], {
      queryParams: {
        page:  this.prevPage,
        limit: this.limit,
      },
      });
    
   }
   
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        this.dialog.open(MatchsDialogue, {
         data: {
           matchs: event.item.data,
         }
        });
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
