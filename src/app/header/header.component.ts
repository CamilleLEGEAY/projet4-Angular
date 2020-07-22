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

  loginRegister: Login = new Login();
  loginLogin: Login = new Login();
  messageErr: string;
  messageOK: string;
  messageErrRegister: string;
  messageOKRegister: string;

  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.messageErr=null;
    this.messageOK=null;
    this.messageErrRegister=null;
    this.messageOKRegister=null;
    this.loginService.postRegister(this.loginRegister)
      .subscribe(
        (loginResponse: LoginResponse) => {
          if (loginResponse.message && loginResponse.message.startsWith("Bonjour")) {
            this.messageOKRegister = loginResponse.message;
          } else {
            this.messageErrRegister = loginResponse.message;
            this.loginRegister = new Login();
          }
        },
        (err) => {
          console.log(err);
          this.messageErrRegister = "Une erreur est survenue";
          this.loginRegister = new Login();
        }
      );
  }

  onLogin() {
    this.messageErrRegister=null;
    this.messageOKRegister=null;
    this.messageErr=null;
    this.messageOK=null;
    this.loginService.postLogin(this.loginLogin)
      .subscribe(
        (loginResponse: LoginResponse) => {
          if (loginResponse.message && loginResponse.message.startsWith("Bonjour")) {
            this.messageOK = loginResponse.message;
          } else {
            this.messageErr = loginResponse.message;
            this.loginLogin = new Login();
          }
        },
        (err) => { console.log(err);
          this.messageErr = "Votre identifiant ou votre mot de passe est incorrect";
          this.loginLogin = new Login(); }
      );
  }

  onLogout(): void {
    sessionStorage.setItem('token', null);
    this.loginService.logged = false;
    let link = ['/'];
    this.router.navigate(link);
  }

}
