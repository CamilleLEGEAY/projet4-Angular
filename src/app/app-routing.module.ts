import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageResultatComponent } from './page-resultat/page-resultat.component';
import { PageLegalComponent } from './page-legal/page-legal.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';



const routes: Routes = [
  { path: 'pageabout', component: PageAboutComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'pageresultat', component: PageResultatComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'pagelegal', component: PageLegalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
