import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from 'src/app/models/team.model';
import { LeagueService } from 'src/app/services/league.service';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { SportService } from 'src/app/services/sports.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  isLinear = false;
  team_1: Team
  team_2: Team
  score_1: number
  score_2: number
  date_time: Date
  date: Date
  time: string
  quote_team1:number
  quote_team2:number
  quote_null:number
  popularite:number=0
  fini=0
  id_win:number
  id_league:number
  team:Team
  league:League
  sport:Sport
  sportLabel=new Sport()
  leaguelabel=new League()
  formsport:FormGroup
  formleague:FormGroup
  onesport:Sport
  constructor(private teamService:TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private leagueService: LeagueService,
    private matchService: MatchService,
    private sportService: SportService,private _formBuilder: FormBuilder,private _snackbar:MatSnackBar) {
      this.formsport = this._formBuilder.group({
        onesport : ['', Validators.required]
      })
      this.formleague = this._formBuilder.group({
        oneleague : ['', Validators.required]
      })
    }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
     this.id_league=parseInt(queryParams.league)
    });
    //this.getTeam()
    this.getSport()
    //this.getLeague()
  }  
  getSport(){
    this.sportService.getSports(1,1000).subscribe(
      (sport:any) => {
        this.sport = sport.docs;
      });
  }
  getLeague(sportid){
    this.leagueService.getLeague(1,1000,sportid).subscribe(
      (league:any) => {
        this.league = league.docs;
      });
  }
  getTeam(leagueid) {
    this.teamService.getTeams(1,1000, leagueid).subscribe(data => {  
      this.team = data.docs
    });
  }
  submit1() {
    let sport = this.formsport.controls['onesport'].value;
    this.getLeague(sport.id)
    this.sportLabel=sport
  }  
  
  submit2() {
    let league = this.formleague.controls['oneleague'].value;
    this.getTeam(league.id)
    this.leaguelabel=league
  }   
  submit3() {
    let matchs=new Match(); 
    matchs.id = Math.floor(Math.random()* 10000);
    matchs.date=this.date;
    matchs.time=this.time;
    matchs.team_1=this.team_1;
    matchs.id_team1=this.team_1.id;
    matchs.id_team2=this.team_2.id;
    matchs.team_2=this.team_2;
    matchs.score_1=this.score_1;
    matchs.score_2= this.score_2;
    matchs.quote_team1=this.quote_team1;
    matchs.quote_team2=this.quote_team2;
    matchs.popularite=this.popularite;
    matchs.quote_null=this.quote_null;
    if(this.score_1>this.score_2)
    {
      matchs.id_win=matchs.id_team1
    } else if (this.score_1<this.score_2) {
      matchs.id_win=matchs.id_team2
    } else {
      matchs.id_win=null
    }
    this.matchService.addMatch(matchs).subscribe(res => {
      this._snackbar.open("match ajouté", "ok");
      this.router.navigate(["/match"]);
    });
  } 
  quote(event) {
    if(event.target.name=="quote_team2"){
      this.quote_team1=1/(1-(1/event.target.value)) //ne vous affolez pas,ceci est un calcul de quote2 a partir de quote 1
    }else{
      this.quote_team2=1/(1-(1/event.target.value)) //ne vous affolez pas,ceci est un calcul de quote2 a partir de quote 1
    }
  } 
  finish(event){
    this.fini=event
  }
}
