import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common/service/login.service';
import { Login } from '../common/data/login';
import { LoginResponse } from '../common/data/login-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  login : Login  = new Login();
  message : string;

  constructor(private loginService : LoginService ) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.loginService.postRegister(this.login)
    .subscribe(
         (loginResponse : LoginResponse)=>{
               console.log(JSON.stringify(loginResponse));
               this.message = loginResponse.message;
          },
         (err)=>{console.log(err); }
    );
  }

}
