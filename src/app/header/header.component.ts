import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../common/service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../common/data/login';
import { LoginResponse } from '../common/data/login-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginRegister: Login  = new Login();
  loginLogin : Login  = new Login();
  message : string;

  constructor(private router: Router,public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.loginService.postRegister(this.loginRegister)
    .subscribe(
         (loginResponse : LoginResponse)=>{
               console.log(JSON.stringify(loginResponse));
               this.message = loginResponse.message;
          },
         (err)=>{console.log(err); }
    );
  }

  onLogin(){
    this.loginService.postLogin(this.loginLogin)
    .subscribe(
         (loginResponse : LoginResponse)=>{
               console.log(JSON.stringify(loginResponse));
               this.message = loginResponse.message;
          },
         (err)=>{console.log(err); this.message = "Votre identifiant ou votre mot de passe est incorrect";}
    );
  }

  onLogout():void {
    sessionStorage.setItem('token', null);
    let link = [ '/pageresultat'];
    this.router.navigate(link);
    this.loginService.logged=false;
  }

}
