import { League } from "./league.model";

export class Team {
  _id?:string;
  id:number;
  logo:string;
  name:string;
  id_league:number;
  league:League
  stade:string
}
