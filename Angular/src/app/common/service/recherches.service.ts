import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etablissement } from '../data/etablissement';

@Injectable({
  providedIn: 'root'
})
export class RecherchesService {
  
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http : HttpClient) { }
  
  /**
   * return every etablissement
   */
  getAll():Observable<Etablissement[]> {
    let url="msRecherche/findAll";
    return this.http.get<Etablissement[]>(url);
  }

}