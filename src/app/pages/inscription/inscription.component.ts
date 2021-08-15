import { SnackbarService } from './../../services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  name: string = '';
  username: string = '';
  email:string = '';
  birthday:Date;
  address:string = '';
  password:string = '';
  passwordConfirm:string = '';

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  error = ''

  constructor(private router:Router, private _formBuilder: FormBuilder, public authService:AuthService, private messagingService:SnackbarService){}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      birthday:['', Validators.required],
      address:['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  inscription(){
    this.authService.signin(this.name, this.username, this.email, this.birthday, this.address, this.password).subscribe(
      result => {
        console.log(result)
        localStorage.setItem('access_token', result.token);
        this.messagingService.openSuccessSnackBar("Vous êtes inscrit! Veuillez vous identifié")
        this.router.navigate(['/accueil']);
      },
      error => this.messagingService.openErrorSnackBar(error?.error?.message || "Une erreur est survenu pendant l'inscription")
    );
  }

  // get name(): any{
  //   return this.firstFormGroup.get('name')
  // }

  // get username(){
  //   return this.firstFormGroup.get('username')
  // }
  // get email(){
  //   return this.firstFormGroup.get('email')
  // }
  // get birthday(){
  //   return this.firstFormGroup.get('birthday')
  // }
  // get address(){
  //   return this.firstFormGroup.get('address')
  // }
  // get password(){
  //   return this.firstFormGroup.get('password')
  // }
  // get passwordConfirm(){
  //   return this.firstFormGroup.get('passwordConfirm')
  // }
}
