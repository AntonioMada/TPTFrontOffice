import { MatchInterface } from './../../models/match.interface';
import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common'
import * as moment from "moment";
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  ELEMENT_DATA: MatchInterface[] = [];
  displayedColumns: string[] = [ 'heure', 'logo_1', 'team_1', '-', 'team_2', 'logo_2', 'score', 'status']
  dataSource = new MatTableDataSource<MatchInterface>(this.ELEMENT_DATA);
  date:Date;

  constructor(private matchservice:MatchService, public datepipe: DatePipe
    // , private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    // let localdate = moment("12/22/2020").format();
    const today =  new Date();
    const tomorrow =  new Date(today.setDate(today.getDate() + 1));
    let latest_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
    this.getMatchsDate(latest_date);
  }

  getMatchsDate(date){
    this.matchservice.getMatchByDate(date).subscribe((matchs) => {
      console.log(matchs)
      this.dataSource.data = matchs.docs as MatchInterface[];
    });
  }

  changeDate(){
    let datetrans = this.datepipe.transform(this.date, 'MM/dd/yyyy')
    this.getMatchsDate(datetrans)
  }
}
