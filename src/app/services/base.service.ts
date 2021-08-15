export class BaseService{
  constructor(){}

  generateRandomNumber(max : number):number {
    return Math.floor(Math.random()*max);
  }
}
