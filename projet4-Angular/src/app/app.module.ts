import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageResultatComponent } from './page-resultat/page-resultat.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageMeComponent } from './page-me/page-me.component';
import { PageLegalComponent } from './page-legal/page-legal.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BsUtilModule } from 'src/bs-util/bs-util.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyAuthInterceptor } from './common/interceptor/my-auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageResultatComponent,
    PageAboutComponent,
    PageMeComponent,
    PageLegalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    TabsModule.forRoot(),
    BsUtilModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyAuthInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
