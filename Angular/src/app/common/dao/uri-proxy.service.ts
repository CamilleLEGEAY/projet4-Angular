import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriProxyService {
        public msLogin:string = "http://localhost:9999"; 
        public msStats:string = "http://localhost:9996";
        public msSauvegarde:string = "http://localhost:9995";
        public urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?statut_diffusion=O&etat_administratif=A';
        public urlDepartement: string = 'https://geo.api.gouv.fr/departements/';
}