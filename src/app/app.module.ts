import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageResultatComponent } from './page-resultat/page-resultat.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageLegalComponent } from './page-legal/page-legal.component';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyAuthInterceptor } from './common/interceptor/my-auth-interceptor';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

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
    AppRoutingModule ,
    FormsModule,
    TabsModule.forRoot(),
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
