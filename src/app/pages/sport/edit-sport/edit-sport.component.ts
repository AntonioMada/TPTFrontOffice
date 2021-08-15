import { HttpClient } from '@angular/common/http';
import { SportService } from './../../../services/sports.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from 'src/app/models/sport.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.scss']
})
export class EditSportComponent implements OnInit {

  filePath: string = "";
  myForm: FormGroup;
  sport: Sport;

  selectFile: File = null;


  constructor(
    public _formbuilder: FormBuilder,
    private sportService: SportService,
    private route: ActivatedRoute,private _snackBar:MatSnackBar,private router:Router
    ) {
    this.myForm = this._formbuilder.group({
      img: [null],
      filename: [null],
      name : ['', Validators.required]
    })

  }

  ngOnInit() {
    this.getSportById();
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.selectFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  getSportById(){
    const uri = "https://tptnode.herokuapp.com";
    const id: number = +this.route.snapshot.params.id;
    this.sportService.getSportById(id).subscribe(
      (sport:Sport) => {
        this.sport = sport;
        this.filePath = uri + "/static/image/sports/"+sport.image;
        this.myForm.controls['name'].setValue(sport.name) ;
      });
  }

  submit() {
    let form = this.myForm.controls['filename'];
    let sports = new Sport();
    if(form.value != null && form.value != ""){
      sports.id = this.sport.id
      sports.image = this.sport.image
      sports.name = this.myForm.controls['name'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', sports.id.toString());
      fd.append('name', sports.name);
      fd.append('image', sports.image);
      this.sportService.updateSportWithUpload(fd).subscribe(res => {
        this._snackBar.open(res.message, "ok");
        this.router.navigate(["/sport"]);
      });
    }else{
      sports.id = this.sport.id
      sports.image = this.sport.image
      sports.name = this.myForm.controls['name'].value;
      this.sportService.updateSportWithOutUpload(sports).subscribe(res => {
        this._snackBar.open(res.message, "ok");
        this.router.navigate(["/sport"]);
      });
    }
  }
}
