import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { ArticleService } from 'src/app/services/article.service';
import { LeagueService } from 'src/app/services/league.service';
import { SportService } from 'src/app/services/sports.service';
import { ArticleComponent } from '../article.component';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  filePath: string = "assets/img/theme/Foot.jpg";
  myForm: FormGroup;
  league: League;
  selectFile: File = null;

  constructor(
    public fb: FormBuilder,
    private _snackbar:MatSnackBar,
    private articleService: ArticleService,private router: Router) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
      date : ['', Validators.required],
      description : ['', Validators.required],
      titre : ['', Validators.required]
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
    let articles = new Article();
    if(form.value != null && form.value != ""){
      articles.id = Math.floor(Math.random()* 10000);
      articles.image = this.myForm.controls['img'].value;
      articles.date = this.myForm.controls['date'].value;
      articles.titre = this.myForm.controls['titre'].value;
      articles.description = this.myForm.controls['description'].value;
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', articles.id.toString());
      fd.append('image', articles.image);
      fd.append('date',  articles.date.toString());
      fd.append('description',  articles.description);
      fd.append('titre',  articles.titre);
      this.articleService.addArticle(fd).subscribe(res => { 
       this._snackbar.open(res.message, "ok");
       this.router.navigate(["/article"]);
      });
    }
  }

}
