import { GlobalService } from './../../services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-button-pari',
  templateUrl: './button-pari.component.html',
  styleUrls: ['./button-pari.component.scss']
})
export class ButtonPariComponent implements OnInit {
  @Input() quote:number;
  @Input() idparie: number;
  @Input() team: string;
  @Input() match: Match;

  constructor(private globalService:GlobalService) { }

  ngOnInit() {
  }

  addCoupon(){
    this.globalService.addCoupon(this.match, this.idparie, this.team, this.quote);
  }
}
