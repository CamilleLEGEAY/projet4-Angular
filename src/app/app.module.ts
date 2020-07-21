
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PageLegalComponent } from './page-legal/page-legal.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageResultatComponent } from './page-resultat/page-resultat.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyAuthInterceptor } from './common/interceptor/my-auth-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageResultatComponent,
    PageAboutComponent,
    PageLegalComponent,
    MyaccountComponent,
    PageAccueilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyAuthInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
