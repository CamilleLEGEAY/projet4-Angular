import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Etablissement } from '../data/etablissement';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  
  
  initYesterday(): Observable<Etablissement[]>{
    let url = environment.msStats+"/msStats/findAll";
      return this.http.get<Etablissement[]>(url, {headers: this._headers});
  }

}

