import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ReponseMsStats } from '../data/reponse-msstats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  
  
  initMonth(): Observable<ReponseMsStats[]>{
    let url = environment.msStats+"/msStats/findAll";
      return this.http.get<ReponseMsStats[]>(url, {headers: this._headers});
  }

}

