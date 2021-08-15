import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { League } from 'src/app/models/league.model';
import { Sport } from 'src/app/models/sport.model';
import { ArticleService } from 'src/app/services/article.service';
import { LeagueService } from 'src/app/services/league.service';
import { SportService } from 'src/app/services/sports.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  article: Article;
  filePath: string = "";
  myForm: FormGroup;
  sport: Sport;

  selectFile: File = null;


  constructor(private datepipe: DatePipe,private _snackbar:MatSnackBar,
    public _formbuilder: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.myForm = this._formbuilder.group({
      img: [null],
      filename: [''],
      date : ['', Validators.required],
      description : ['', Validators.required],
      titre: ['', Validators.required]
    })

  }

  ngOnInit() {
    this.getArticleById();
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
  getArticleById(){
    const uri = "https://tptnode.herokuapp.com";
    const id: number = +this.route.snapshot.params.id;
    this.articleService.getArticleById(id).subscribe(
      (article:Article) => {
        this.article = article;
        this.filePath = uri + "/static/image/articles/"+article.image;
        this.myForm.controls['date'].setValue(this.datepipe.transform(article.date, 'yyyy-MM-dd')) ;
        this.myForm.controls['description'].setValue(article.description) ;
        this.myForm.controls['titre'].setValue(article.titre) ;
      });
  }

  submit() {
    let form = this.myForm.controls['filename'];
    let articles = new Article();
    if(form.value != null && form.value != ""){
      // sports.id = Math.floor(Math.random()* 10000);
      articles.id = this.article.id
      articles.image = this.article.image
      articles.date = this.myForm.controls['date'].value;
      articles.description = this.myForm.controls['description'].value;
      articles.titre = this.myForm.controls['titre'].value;
      const fd = new FormData();
      console.log(articles.image);
      fd.append('file', this.selectFile, this.selectFile.name);
      fd.append('id', articles.id.toString());
      fd.append('date', articles.date.toString());
      fd.append('image', articles.image);
      fd.append('description',articles.description);
      fd.append('titre',articles.titre);
      this.articleService.updateArticleWithUpload(fd).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/article"]);
      });
    }else{
      articles.id = this.article.id
      articles.image = this.article.image
      articles.date = this.myForm.controls['date'].value;
      articles.description = this.myForm.controls['description'].value;
      articles.titre = this.myForm.controls['titre'].value;
      this.articleService.updateArticleWithOutUpload(articles).subscribe(res => {
        this._snackbar.open(res.message, "ok");
        this.router.navigate(["/article"]);
      });
    }
  }
}
