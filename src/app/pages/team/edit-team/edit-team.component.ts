import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { latLng, LeafletMouseEvent, marker, polyline, tileLayer } from 'leaflet';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { Team } from 'src/app/models/team.model';
import { LeagueService } from 'src/app/services/league.service';
import { SportService } from 'src/app/services/sports.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  league: League;
  team:Team;
  filePath: string = "";
  myForm: FormGroup;
  coordonnees=[]
  adresse=""
  sport:number=0
  options = {
    layers: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors'

      }),
      polyline([[ 46.78465227596462,-121.74141269177198 ]]),

    ],
    zoom: 5,
    center: latLng(-18.766947, 46.869107),
  };
  selectFile: File = null;
  layers: any[];


  constructor(
    public _formbuilder: FormBuilder,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private _snackbar:MatSnackBar,
    private router:Router
    ) {
    this.myForm = this._formbuilder.group({
      logo: [null],
      filename: [''],
      name : ['', Validators.required],
      league : ['', Validators.required]
    })

  }

  ngOnInit() {
    this.getTeamById();
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

  getTeamById(){
    const uri = "https://tptnode.herokuapp.com";
    const id: number = +this.route.snapshot.params.id;
    this.teamService.getTeamById(id).subscribe(
      (team:Team) => {
        this.team = team[0];
        this.filePath = uri + "/static/image/teams/"+team[0].logo;
        this.myForm.controls['name'].setValue(team[0].name) ;
        this.myForm.controls['league'].setValue(team[0].league.id) ;
        this.adresse=team[0].stade
       this.sport=team[0].sport[0].id
       this.getLeagues();
      });
  }
  getLeagues(){  
    this.leagueService.getLeague(1,1000,this.sport).subscribe(data => {  
      this.league = data.docs
    });
  }

  submit() {
    let form = this.myForm.controls['filename'];
    let teams = new Team();
    if(form.value != null && form.value != ""){
      // sports.id = Math.floor(Math.random()* 10000);
      teams.id = this.team.id
      teams.logo = this.team.logo
      teams.name = this.myForm.controls['name'].value;
      teams.id_league = this.myForm.controls['league'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', teams.id.toString());
      fd.append('name', teams.name);
      fd.append('logo', teams.logo);
      fd.append('id_league',teams.id_league.toString());
      fd.append('stade',this.adresse);
      this.teamService.updateTeamWithUpload(fd).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/team"]);
      });
    }else{
      teams.id = this.team.id
      teams.logo = this.team.logo
      teams.name = this.myForm.controls['name'].value;
      teams.id_league = this.myForm.controls['league'].value;
      teams.stade = this.adresse
      this.teamService.updateTeamWithOutUpload(teams).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/team"]);
      });
    }
  }
  handleEvent(click: string, $event: LeafletMouseEvent) {
    this.layers = [
      marker([ $event.latlng.lat, $event.latlng.lng ]),
    ];
    this.coordonnees=[ $event.latlng.lat,$event.latlng.lng]
    this.geCoordonnee()
  }
  geCoordonnee(){
    this.teamService.reverseGeocoding(this.coordonnees).subscribe((data) => {
      this.adresse = data.display_name;
    });
  }
}
