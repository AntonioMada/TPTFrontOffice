import { ProfilUserComponent } from './pages/profil-user/profil-user.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { LeaguesComponent } from './pages/leagues/leagues.component';
import { CalendrierComponent } from './pages/calendrier/calendrier.component';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';
import { ResultatsComponent } from './pages/resultats/resultats.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { SportComponent } from './pages/sport/sport.component';

const routes: Routes = [
  {path:'', redirectTo: '/accueil', pathMatch: 'full'},
  {path:"accueil", component: AccueilComponent},
  {path:"matchs", component: MatchsComponent},
  {path:"resultat", component: ResultatsComponent},
  {path:"stats", component: StatistiquesComponent},
  {path:"inscription", component: InscriptionComponent},
  {path:"login", component: LoginComponent},
  {path:"calendrier", component: CalendrierComponent},
  {path:"sport", component: SportComponent},
  {path:"leagues/:idsport", component: LeaguesComponent},
  {path:"paiement", component: PaymentComponent},
  {path:"user/profil", component: ProfilUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
