import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { ImageCropperModule } from "ngx-image-cropper";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { MessagingService } from "src/app/services/firebase.service";
// import { NgxFileDragDropModule } from 'ngx-file-drag-drop';

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { LeagueComponent } from "../../pages/league/league.component";
import { AddLeagueComponent } from "../../pages/league/add-league/add-league.component";
import { EditLeagueComponent } from "../../pages/league/edit-league/edit-league.component";
import { SportComponent } from "../../pages/sport/sport.component";
import { AddSportComponent } from "../../pages/sport/add-sport/add-sport.component";
import { EditSportComponent } from "../../pages/sport/edit-sport/edit-sport.component";
import { UsersComponent } from "../../pages/users/users.component";
import { TeamComponent } from "../../pages/team/team.component";
import { AddTeamComponent } from "../../pages/team/add-team/add-team.component";
import { EditTeamComponent } from "../../pages/team/edit-team/edit-team.component";
import { DatePipe } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatchComponent } from "src/app/pages/match/match.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ArticleComponent } from "src/app/pages/article/article.component";
import { AddArticleComponent } from "src/app/pages/article/add-article/add-article.component";
import { EditArticleComponent } from "src/app/pages/article/edit-article/edit-article.component";
import { AddMatchComponent } from "src/app/pages/match/add-match/add-match.component";
import { EditMatchComponents } from "src/app/pages/match/edit-match/edit-match.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatchsDialogue } from "src/app/pages/match/match-dialogue/match-dialogue.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { BrowserModule } from '@angular/platform-browser';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AsyncPipe } from '@angular/common';

@NgModule({
  imports: [
    //BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatProgressSpinnerModule,
    DragDropModule, MatListModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MaterialFileInputModule,
    ImageCropperModule, NgApexchartsModule,
    //  NgxFileDragDropModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    LeafletModule,
    MatSnackBarModule
  ],
  declarations: [
    DashboardComponent,
    MatchComponent,
    AddMatchComponent,
    EditMatchComponents,
    LeagueComponent,
    AddLeagueComponent,
    EditLeagueComponent,
    SportComponent,
    AddSportComponent,
    EditSportComponent,
    UsersComponent,
    TeamComponent,
    AddTeamComponent,
    EditTeamComponent,
    ArticleComponent,
    AddArticleComponent,
    EditArticleComponent,
    MatchsDialogue
  ],

  providers: [
    DatePipe,
    AsyncPipe,
    MessagingService
  ],

})
export class AdminLayoutModule { }
