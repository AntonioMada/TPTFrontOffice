import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatchService } from "src/app/services/match.service";
import { Match } from "src/app/models/match.model";
@Component({
  selector: "matchs.dialogue",
  templateUrl: "match-dialogue.component.html",
})
export class MatchsDialogue {
    score1=0
    score2=0
    idmatch=0
    idteamwinner=0
  constructor(
    private matchService:MatchService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialogRef<MatchsDialogue>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick() {
    this.dialog.close();
  }
  submit(event) {
    let idteamwinner;
    if(this.score1<this.score2){
      idteamwinner=event.team_2[0].id
    }
    else if(this.score1>this.score2){
      idteamwinner=event.team_2[0].id
    }
    else{  
     idteamwinner=-1
    } 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.matchService.finaliseMatch(
      event.id,
      this.score1,
      this.score2,idteamwinner).subscribe((message) => {
        this.router.navigate(["/match"]);
        this.dialog.close();
        this._snackBar.open('match finaliser', "ok");
      });
  }
}
