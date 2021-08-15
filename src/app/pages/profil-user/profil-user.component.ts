import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {
  name: string = '';
  username: string = '';
  email:string = '';
  birthday:Date;
  address:string = '';
  password:string = '';
  profileFormGroup: FormGroup;
  hide = true;

  constructor(private authService:AuthService, private userService:UserService, private _formBuilder: FormBuilder, private messagingService:SnackbarService) { }

  ngOnInit() {
    this.profileFormGroup = this._formBuilder.group({
      name:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      birthday:['', Validators.required],
      address:['', Validators.required],
      password: ['', Validators.required]
    });
    this.getProfile()
  }

  getProfile(){
    const id = Number(localStorage.getItem('id_user'));
    console.log("getProfile()!!!")
    this.authService.getMe(id).subscribe((user) => {
      console.clear()
      console.log(user)
      this.name = user.name;
      this.username = user.username;
      this.email = user.email;
      this.birthday = user.birthday;
      this.address = user.address;
      // this.password = user.password;
    });
  }

  updateProfile(){
    const id = Number(localStorage.getItem('id_user'));
    this.userService.updateUser(id, this.email, this.name, this.username, this.address, this.birthday, this.password).subscribe(
      (result)=> {
        this.messagingService.openSuccessSnackBar("Votre profil a été modifié.")
      },
      (err) => {
        this.messagingService.openErrorSnackBar("Une erreur s'est produite durant la modification de votre profil!")
      }
    );
  }
}
