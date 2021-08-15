import { League } from "./league.model";

export class Sport {
  _id?:string;
  id:number;
  image:string;
  name:string;
  leagues: League[];
}
