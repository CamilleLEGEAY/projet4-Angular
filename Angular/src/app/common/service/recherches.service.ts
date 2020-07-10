import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etablissement } from '../data/etablissement';
import { Proxy } from '../dao/proxy';
import { EtablissementEntrant } from '../data/etablissement-entrant';
import { ReponseApiUnitesLegales, ReponseApiEtablissements } from '../data/reponses-api';

const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?per_page=100';

@Injectable({
  providedIn: 'root'
})
export class RecherchesService {
  
  private proxy : Proxy = new Proxy();
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http : HttpClient) { }
  
  /**
   * return every etablissement
   */
  /*getAll():Observable<Etablissement[]> {
    let url=this.proxy.msStats+"/findAll";
    return this.http.get<Etablissement[]>(url);
  }*/

  /**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage 
 */
getAll():Observable<ReponseApiEtablissements> {
  let url = urlEtablissement + "&page=" + 1 + "&date_creation=" + "2020-07-06";
  return this.http.get<ReponseApiEtablissements>(url);
}

}