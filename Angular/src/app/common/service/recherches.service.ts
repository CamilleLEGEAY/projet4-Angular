import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReponseApiEtablissements } from '../data/reponses-api';
import { catchError } from 'rxjs/internal/operators/catchError';

export const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?statut_diffusion=O&etat_administratif=A';
const urlDepartement: string = 'https://geo.api.gouv.fr/departements/';

@Injectable({
  providedIn: 'root'
})
export class RecherchesService {

  constructor(private http: HttpClient) { }

  getPageOne(): Observable<ReponseApiEtablissements> {
    let url = urlEtablissement + "&per_page=20&page=1";
    return this.http.get<ReponseApiEtablissements>(url);
  }
  /**
   * recupère la liste des départements de France
   */
  initDepartements(): Observable<any> {
    let url = urlDepartement;
    return this.http.get<any>(url);
  }
  /**
   * fait une liste des codes postaux du departement
   */
  initCP(departement: string): Observable<any[]> {
    let url = urlDepartement + departement + "/communes";
    return this.http.get<any[]>(url);
  }
  /**
   * passe les requètes à l'API SIRENE
   * @param urlFinal 
   */
  doSearch(urlFinal: string): Observable<ReponseApiEtablissements> {
    console.log(urlFinal);
    return this.http.get<ReponseApiEtablissements>(urlFinal).pipe(
      catchError(err => of({etablissements:[],meta:{total_results:0,per_page:0,total_pages:0,page:0}})));
  }

}