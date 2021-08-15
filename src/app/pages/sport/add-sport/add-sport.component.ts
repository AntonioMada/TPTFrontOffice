import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sport } from 'src/app/models/sport.model';
import { SportService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.scss']
})
export class AddSportComponent implements OnInit {
  // image: string = "assets/img/theme/king-football-logo_21010-8.jpg";
  filePath: string = "assets/img/theme/Foot.jpg";
  myForm: FormGroup;
  sport: Sport;
  selectFile: File = null;

  constructor(public fb: FormBuilder,
    private sportService: SportService,private _snackBar:MatSnackBar,private router:Router) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
      name : ['', Validators.required]
    })
  }

  ngOnInit() {}

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.selectFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submit() {
    let form = this.myForm.controls['filename'];
    let sports = new Sport();
    if(form.value != null && form.value != ""){
      sports.id = Math.floor(Math.random()* 10000);
      sports.image = this.myForm.controls['img'].value;
      sports.name = this.myForm.controls['name'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', sports.id.toString());
      fd.append('name', sports.name);
      fd.append('image', sports.image);
      this.sportService.addSport(fd).subscribe(res => {
        this._snackBar.open(res.message+" added", "ok");
        this.router.navigate(["/sport"]);
      });
    }
  }

}

