import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  /*{ path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'pageresultat', component: PageResultatComponent },
  { path: 'pageabout', component: PageAboutComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'pagelegal', component: PageLegalComponent }*/
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
