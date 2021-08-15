import { Match } from "./match.model"
import { ParisDetail } from "./parisdetail.model";

export class Resultat {
  match: Match[];
  pari: ParisDetail;
  gain: number;
  perte: number;
}
