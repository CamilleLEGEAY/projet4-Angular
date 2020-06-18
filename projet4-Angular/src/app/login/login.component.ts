import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../common/data/login-response';
import { Login } from '../common/data/login';
import { LoginService } from '../common/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login : Login  = new Login();
  message : string;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.loginService.postLogin(this.login)
    .subscribe(
         (loginResponse : LoginResponse)=>{
               console.log(JSON.stringify(loginResponse));
               this.message = loginResponse.message;
               this.checkLogin(loginResponse);
          },
         (err)=>{console.log(err); }
    );
  }

  checkLogin(loginResponse :LoginResponse){
    if (loginResponse.token!= null){
      console.log(loginResponse.token);
      let link = [ '/'];
      this.router.navigate(link);
    }
  }
}
