import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../common/data/login-response';
import { Login } from '../common/data/login';
import { LoginService } from '../common/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login : Login  = new Login();
  message : string;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.loginService.postLogin(this.login)
    .subscribe(
         (loginResponse : LoginResponse)=>{
               console.log(JSON.stringify(loginResponse));
               this.message = loginResponse.message;
          },
         (err)=>{console.log(err); }
    );
  }

}
