import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReponseApiEtablissements } from '../data/reponses-api';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Recherche, RechercheToSave } from '../data/recherche';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RecherchesService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * recupère la liste des départements de France
   */
  initDepartements(): Observable<any> {
    let url = environment.urlDepartement;
    return this.http.get<any>(url);
  }
  /**
   * fait une liste des codes postaux du departement
   */
  initCP(departement: string): Observable<any[]> {
    let url = environment.urlDepartement + departement + "/communes";
    return this.http.get<any[]>(url);
  }
  /**
   * passe les requètes à l'API SIRENE
   * @param urlFinal 
   */
  doSearch(urlFinal: string): Observable<ReponseApiEtablissements> {
    return this.http.get<ReponseApiEtablissements>(urlFinal).pipe(
      catchError(err => of({etablissements:[],meta:{total_results:0,per_page:0,total_pages:0,page:0}})));
  }

  postSearch(recherche:Recherche): Observable<String>{
    let url = environment.msSauvegarde+"/msSauvegarde/public/SaveRecherche";
    //let url = "/msSauvegarde/public/SaveRecherche";
    let rechercheToSave: RechercheToSave = new RechercheToSave();
    rechercheToSave.recherche= recherche ;
    rechercheToSave.token = sessionStorage.getItem('token').trim();
    console.log(url);
    return this.http.post<String>(url,rechercheToSave, {headers: this._headers})
  }

}