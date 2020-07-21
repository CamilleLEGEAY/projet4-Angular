import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout():void {
    sessionStorage.setItem('token', null);
    let link = [ '/pageresultat'];
    this.router.navigate(link);
    console.log(sessionStorage.getItem("token"));
  }

}
