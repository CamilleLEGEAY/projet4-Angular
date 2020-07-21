import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageMeComponent } from './page-me/page-me.component';
import { PageResultatComponent } from './page-resultat/page-resultat.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PageLegalComponent } from './page-legal/page-legal.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

const routes: Routes = [
  { path: 'pageabout', component: PageAboutComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'pageme', component: PageMeComponent },
  { path: 'pageresultat', component: PageResultatComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'pagelegal', component: PageLegalComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
