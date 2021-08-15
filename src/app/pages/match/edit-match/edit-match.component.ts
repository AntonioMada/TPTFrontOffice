import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "src/app/models/team.model";
import { Match } from "src/app/models/match.model";
import { MatchService } from "src/app/services/match.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-match",
  templateUrl: "./edit-match.component.html",
  styleUrls: ["./edit-match.component.scss"],
})
export class EditMatchComponents implements OnInit {
  match: Match;
  myForm: FormGroup;
  score1:number;
  team_1:Team;
  team_2:Team;
  constructor(
    public _formbuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.myForm = this._formbuilder.group({
      score1: ["", Validators.required],
      score2: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.getMatch();
  }
  getMatch() {
    const id: number = +this.route.snapshot.params.id;
    this.matchService.getMatch(id).subscribe((match: Match) => {
      this.match = match[0];
      this.team_1=this.match.team_1;
      this.team_2=this.match.team_2;
      this.myForm.controls["score1"].setValue(this.match.score_1);
      this.myForm.controls["score2"].setValue(this.match.score_2);
    });
  }
  submit() {}
}
