import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common/service/login.service';
import { Login } from '../common/data/login';
import { LoginResponse } from '../common/data/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  login : Login  = new Login();
  message : string;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  update(){
    this.loginService.postUpdate(this.login)
    .subscribe(
        (loginResponse : LoginResponse)=>{
            console.log(JSON.stringify(loginResponse));
            this.message = loginResponse.message;
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
      console.log(localStorage.getItem('token'));
      let link = [ '/'];
      this.router.navigate(link);
    }
  }
}
