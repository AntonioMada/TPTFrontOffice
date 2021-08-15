import { LeagueService } from './../../services/league.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
  id = '';
  leagues:any
  totalDocs:number;
  limit:number;
  page:number;
  totalPages:number;
  pagingCounter:number;
  hasPrevPage:number;
  hasNextPage:number;
  prevPage:number;
  newtPage:number;

  constructor(private route: ActivatedRoute, private leagueservice:LeagueService) { }

  ngOnInit() {
    this.getLeagueBySport();
  }

  getLeagueBySport(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('idsport')
    console.log('id = '+ this.id)
    this.leagueservice.getLeagueBySportId(this.id).subscribe((results) => {
      this.leagues = results.docs

      console.log(results.docs)
    })
  }
}
