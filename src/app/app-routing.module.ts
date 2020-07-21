import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageLegalComponent } from './page-legal/page-legal.component';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'pageabout', component: PageAboutComponent },
  //{ path: 'myaccount', component: MyaccountComponent },
  //{ path: 'pageresultat', component: PageResultatComponent },
  { path: 'pagelegal', component: PageLegalComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
