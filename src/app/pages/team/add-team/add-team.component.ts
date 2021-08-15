import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { circle, icon, latLng, LeafletMouseEvent, marker, polygon, polyline, tileLayer } from "leaflet";
import { League } from "src/app/models/league.model";
import { Team } from "src/app/models/team.model";
import { LeagueService } from "src/app/services/league.service";
import { SportService } from "src/app/services/sports.service";
import { TeamService } from "src/app/services/team.service";

@Component({
  selector: "app-add-team",
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.scss"],
})
export class AddTeamComponent implements OnInit {
  markers:any={}
  layers=[]
  coordonnees=[]
  adresse=""
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
  
  leagues: League[];
  filePath: string = "assets/img/theme/Foot.jpg";
  myForm: FormGroup;
  team: Team;
  selectFile: File = null;

  constructor(
    private sportsService: SportService,
    public fb: FormBuilder,
    private leagueService: LeagueService,
    private teamService: TeamService,private _snackbar:MatSnackBar,private router:Router
  ) {
    this.myForm = this.fb.group({
      logo: [null],
      filename: [""],
      name: ["", Validators.required],
      league: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getLeagues();
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.selectFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  getLeagues() {
    this.leagueService.getLeague(1, 1000, null).subscribe((data) => {
      this.leagues = data.docs;
    });
  }
  submit() {
    let form = this.myForm.controls["filename"];
    let teams = new Team();
    if (form.value != null && form.value != "") {
      teams.id = Math.floor(Math.random() * 10000);
      teams.logo = this.myForm.controls["logo"].value;
      teams.name = this.myForm.controls["name"].value;
      teams.league = this.myForm.controls["league"].value;
      const fd = new FormData();
      fd.append("file", this.selectFile, this.selectFile.name);
      fd.append("id", teams.id.toString());
      fd.append("name", teams.name);
      fd.append("logo", teams.logo);
      fd.append("id_league", teams.league.id.toString());
      fd.append("stade",this.adresse);
      this.teamService.addTeam(fd).subscribe((res) => {
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
