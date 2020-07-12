import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseApiEtablissements } from '../data/reponses-api';

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

  initDepartements(): Observable<any> {
    let url = urlDepartement;
    return this.http.get<any>(url);
  }

  doSearch(urlFinal: string) : Observable<ReponseApiEtablissements> {
    console.log(urlFinal);
    return this.http.get<ReponseApiEtablissements>(urlFinal);
  }
  



  cpDepartement(departement: string): string[] {
    let listeCP: Array<string> = new Array<string>();
    listeCP.push("77100");
    listeCP.push("30900");
    return listeCP;
  }

}