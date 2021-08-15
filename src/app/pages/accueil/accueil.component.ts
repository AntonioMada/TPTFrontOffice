import { MatchMostBet } from './../../models/matchmostbet.model';
import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment.dev';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, interval } from 'rxjs';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  baseurlfile = environment.urlstatic
  constructor(private homeService:HomeService, private spinner: NgxSpinnerService) {
    this.loadContent();
   }
  matchmostpopular:Match[]
  matchnottobemissed:MatchMostBet[]
  articles:Article[]
  articleactuel:Article
  matchnull:string = 'Match null'

  value = 0;
  loading = true;

  ngOnInit() {
    this.matchsLesPlusPopulaires()
    this.matchsANePasManque()
    this.articleDuJour()
  }

  matchsLesPlusPopulaires(){
    this.homeService.getMatchMostPopulate().subscribe((matchs) => {
      console.log(matchs.docs)
      this.matchmostpopular = matchs.docs
      console.log(this.matchmostpopular)
    });
  }

  matchsANePasManque(){
    this.homeService.getMatchNotToBeMissed().subscribe((matchs) => {
      this.matchnottobemissed = matchs
      console.log(this.matchnottobemissed)
    });
  }

  articleDuJour(){
    this.homeService.getArticleOfTheDay().subscribe((articles) => {
      // console.clear()
      // console.log(articles)
      this.articles = articles.docs
    });
  }

  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 10;
      if(this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        console.log('Ha terminado');
      }
    });
  }
}
