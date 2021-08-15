import { SportService } from './../../services/sport.service';
import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/sport.model';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {

  sports:Sport[]

  constructor(private sportService:SportService) { }

  ngOnInit() {
    this.getSport()
  }

  getSport(){
    this.sportService.getSports().subscribe((sports) => {
      console.log(sports.docs)
      this.sports = sports.docs
    });
  }
}
