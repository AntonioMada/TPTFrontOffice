import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { LeagueService } from 'src/app/services/league.service';
import { SportService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-edit-league',
  templateUrl: './edit-league.component.html',
  styleUrls: ['./edit-league.component.scss']
})
export class EditLeagueComponent implements OnInit {
  league: League;
  filePath: string = "";
  myForm: FormGroup;
  sport: Sport;

  selectFile: File = null;


  constructor(
    public _formbuilder: FormBuilder,
    private leagueService: LeagueService,
    private sportService: SportService,
    private route: ActivatedRoute,
    private _snackbar:MatSnackBar,
    private router:Router
    ) {
    this.myForm = this._formbuilder.group({
      img: [null],
      filename: [''],
      name : ['', Validators.required],
      sport : ['', Validators.required]
    })

  }

  ngOnInit() {
    this.getLeagueById();
    this.getSports();
  }

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
    this.sportService.getSports(1,1000).subscribe(data => {  
      this.sport = data.docs
    });
  }
  getLeagueById(){
    const uri = "https://tptnode.herokuapp.com";
    const id: number = +this.route.snapshot.params.id;
    this.leagueService.getLeagueById(id).subscribe(
      (league:League) => {
        this.league = league[0];
        this.filePath = uri + "/static/image/leagues/"+league[0].image;
        this.myForm.controls['name'].setValue(league[0].name) ;
        this.myForm.controls['sport'].setValue(league[0].sport[0].id) ;
      });
  }

  submit() {
    let form = this.myForm.controls['filename'];
    let leagues = new League();
    if(form.value != null && form.value != ""){
      // sports.id = Math.floor(Math.random()* 10000);
      leagues.id = this.league.id
      leagues.image = this.league.image
      leagues.name = this.myForm.controls['name'].value;
      leagues.id_sport = this.myForm.controls['sport'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', leagues.id.toString());
      fd.append('name', leagues.name);
      fd.append('image', leagues.image);
      fd.append('id_sport',leagues.id_sport.toString());
      this.leagueService.updateLeagueWithUpload(fd).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/league"]);
      });
    }else{
      leagues.id = this.league.id
      leagues.image = this.league.image
      leagues.name = this.myForm.controls['name'].value;
      leagues.id_sport = this.myForm.controls['sport'].value;
      this.leagueService.updateLeagueWithOutUpload(leagues).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/league"]);
      });
    }
  }
}
