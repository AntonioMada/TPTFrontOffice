import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { MatchMostBet } from 'src/app/models/matchmostbet.model';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {
  matchstop20:MatchMostBet[]

  constructor(private matchService:MatchService) { }

  ngOnInit() {
    this.top20DesMatchsLesPlusParies()
  }

  top20DesMatchsLesPlusParies(){
    this.matchService.getTop20().subscribe((matchs) => {
      this.matchstop20 = matchs
      console.log(this.matchstop20)
    })
  }

}
