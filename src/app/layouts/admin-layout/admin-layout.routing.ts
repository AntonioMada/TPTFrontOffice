import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddSportComponent } from 'src/app/pages/sport/add-sport/add-sport.component';
import { LeagueComponent } from 'src/app/pages/league/league.component';
import { MatchComponent } from 'src/app/pages/match/match.component';
import { TeamComponent } from './../../pages/team/team.component';
import { SportComponent } from './../../pages/sport/sport.component';
import { EditSportComponent } from 'src/app/pages/sport/edit-sport/edit-sport.component';
import { EditLeagueComponent } from 'src/app/pages/league/edit-league/edit-league.component';
import { AddLeagueComponent } from 'src/app/pages/league/add-league/add-league.component';
import { AddTeamComponent } from 'src/app/pages/team/add-team/add-team.component';
import { EditTeamComponent } from 'src/app/pages/team/edit-team/edit-team.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { ArticleComponent } from 'src/app/pages/article/article.component';
import { AddArticleComponent } from 'src/app/pages/article/add-article/add-article.component';
import { EditArticleComponent } from 'src/app/pages/article/edit-article/edit-article.component';
import { AddMatchComponent } from 'src/app/pages/match/add-match/add-match.component';
import { EditMatchComponents } from 'src/app/pages/match/edit-match/edit-match.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sport', component: SportComponent },
    { path: 'sport/add', component: AddSportComponent },
    { path: 'sport/:id', component: EditSportComponent },
    { path: 'league', component: LeagueComponent },
    { path: 'league/add', component: AddLeagueComponent },
    { path: 'league/:id', component: EditLeagueComponent},
    { path: 'match', component: MatchComponent },
    { path: 'match/add', component: AddMatchComponent },
    { path: 'match/:id', component: EditMatchComponents },
    { path: 'team', component: TeamComponent },
    { path: 'team/add', component: AddTeamComponent },
    { path: 'team/:id', component: EditTeamComponent },
    { path: 'user', component: UsersComponent },
    { path: 'article', component: ArticleComponent },
    { path: 'article/add', component: AddArticleComponent },
    { path: 'article/:id', component: EditArticleComponent },
];
