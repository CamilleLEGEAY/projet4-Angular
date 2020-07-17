import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UriProxyService } from '../dao/uri-proxy.service';
import { Observable } from 'rxjs';
import { Etablissement } from '../data/etablissement';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private proxy : UriProxyService) { }
  
  
  initYesterday(): Observable<Etablissement[]>{
    let url = this.proxy.msStats+"/msStats/findAll";
    //let url = "/msStats/findAll";
    console.log(url);
      return this.http.get<Etablissement[]>(url, {headers: this._headers});
  }

}

