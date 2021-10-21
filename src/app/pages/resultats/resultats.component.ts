import { ResultatService } from './../../services/resultat.service';
import { Component, OnInit } from '@angular/core';
import { Resultat } from 'src/app/models/resultat.model';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent implements OnInit {

  constructor(private resultatService:ResultatService) { }

  iduser:number
  max:number = 20
  offset:number = 10
  matchsresultat:Resultat[]

  ngOnInit() {
    this.iduser = Number(localStorage.getItem('id_user'))
    this.getAllResultat()
  }

  getAllResultat(){
    this.resultatService.getResultatMatch(this.iduser, this.max, this.offset)
    .subscribe((resultat) => {
      console.clear()
      console.log(resultat)
      this.matchsresultat = resultat
      console.log(this.matchsresultat)
    })
  }

  getTeamParie(idteam, match){
    console.clear()
    console.log(idteam)
    console.log(match)
    if(idteam == match.team_1[0].id) return match.team_1[0].name
    if(idteam == match.team_2[0].id) return match.team_2[0].name
    if(idteam == 0) return "Match nul"
  }
}
