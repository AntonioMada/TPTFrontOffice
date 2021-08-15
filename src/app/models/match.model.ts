import { Team } from "./team.model";

export class Match {
  _id?:string;
  id:number;
  team_1:Team[];
  team_2:Team[];
  score_1:number;
  score_2:number;
  date_time:Date;
  date:Date;
  time:string;
  quote_team1:number;
  quote_team2:number;
  quote_null:number;
  popularite:number;
  id_win:number;
}
