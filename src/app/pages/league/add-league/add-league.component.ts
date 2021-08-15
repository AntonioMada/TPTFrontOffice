import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { LeagueService } from 'src/app/services/league.service';
import { SportService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.scss']
})
export class AddLeagueComponent implements OnInit {
  sports:Sport[]
  filePath: string = "assets/img/theme/angular.jpg";
  myForm: FormGroup;
  league: League;
  selectFile: File = null;

  constructor(
    private sportsService:SportService,
    public fb: FormBuilder,
    private leagueService: LeagueService,private _snackbar:MatSnackBar,private router:Router) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
      name : ['', Validators.required],
      sport : ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getSports();}

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.selectFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  getSports(){  
    this.sportsService.getSports(1,1000).subscribe(data => {  
      this.sports = data.docs
    });
  } 
  submit() {
    let form = this.myForm.controls['filename'];
    let leagues = new League();
    if(form.value != null && form.value != ""){
      leagues.id = Math.floor(Math.random()* 10000);
      leagues.image = this.myForm.controls['img'].value;
      leagues.name = this.myForm.controls['name'].value;
      leagues.sport = this.myForm.controls['sport'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', leagues.id.toString());
      fd.append('name', leagues.name);
      fd.append('image', leagues.image);
      fd.append('id_sport',  leagues.sport.id.toString());
      this.leagueService.addLeague(fd).subscribe(res => {
        this.router.navigate(["/league"]);
        this._snackbar.open(res.message, "ok");
      });
    }
  }

}
