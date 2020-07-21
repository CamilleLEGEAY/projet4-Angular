import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common/service/login.service';
import { Login } from '../common/data/login';
import { LoginResponse } from '../common/data/login-response';
import { Router } from '@angular/router';
import { LoginUpdate } from '../common/data/login-update';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  login : Login  = new Login();
  loginUpdate : LoginUpdate = new LoginUpdate();
  message : string;
  username : string ;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
    this.username=sessionStorage.getItem('user');
  }

  update(){
    this.loginUpdate.username = this.login.username;
    this.loginUpdate.token = sessionStorage.getItem('token').trim();
    this.loginService.postUpdate(this.loginUpdate)
    .subscribe(
        (reponse : string)=>{
            console.log(JSON.stringify(reponse));
            this.message = reponse;
       },
      (err)=>{console.log(err); }
    );
  }

  
  delete(){
    this.loginService.postDelete()
    .subscribe(
      (loginResponse : LoginResponse)=>{
            console.log(JSON.stringify(loginResponse));
            this.message = loginResponse.message;
            this.checkDelete(loginResponse);
       },
      (err)=>{console.log(err); }
 );
  }

  checkDelete(loginResponse :LoginResponse){
    if (loginResponse.token== null){
      console.log(sessionStorage.getItem('token'));
      let link = [ '/'];
      this.router.navigate(link);
    }
  }
}
