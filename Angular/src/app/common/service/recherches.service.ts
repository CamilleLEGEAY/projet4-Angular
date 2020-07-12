import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseApiEtablissements } from '../data/reponses-api';
import { Recherche } from '../data/recherche';

const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?statut_diffusion=O&etat_administratif=A';
const urlDepartement: string = 'https://geo.api.gouv.fr/departements/';

@Injectable({
  providedIn: 'root'
})
export class RecherchesService {

  reponseAPIconcat: ReponseApiEtablissements = new ReponseApiEtablissements();

  constructor(private http: HttpClient) { }

  getPageOne(): Observable<ReponseApiEtablissements> {
    let url = urlEtablissement + "&per_page=20&page=1";
    return this.http.get<ReponseApiEtablissements>(url);
  }

  initDepartements(): Observable<any> {
    let url = urlDepartement;
    return this.http.get<any>(url);
  }
  /**
   * J'essaye de remonter this.reponseAPIconcat dans mon component
   * @param recherche 
   */
  async postRecherche(recherche: Recherche): Promise<ReponseApiEtablissements> {
    this.reponseAPIconcat = new ReponseApiEtablissements();
    var url = urlEtablissement + "&per_page=20&page=1";
    let extentionUrl = this.urlLevelOne(recherche);
    if (extentionUrl != null) {url = url + extentionUrl;}

    if (recherche.departement != null && recherche.code_postal===undefined ||recherche.code_postal==="") {
      console.log("recherche.cp est null")
      if (recherche.departement === "2A" || recherche.departement === "2B") {
        recherche.departement = "20";
      }
      await this.searchWithDepartement(recherche,url).then((reponse)=>{
        return new Promise (function(){this.reponseAPIconcat});

      });
    }
    else {
      if (recherche.effectifs != null) {
        await this.searchWithEffectif(recherche.effectifs,url).then((reponse)=>{
          return new Promise (function(){this.reponseAPIconcat});

        });
      }
      else {console.log("Je vais doSearch"); await this.doSearch(url).then((reponse)=>{
        console.log("fin service : "+JSON.stringify(this.reponseAPIconcat));
        return new Promise (function(){this.reponseAPIconcat});

      });}
    }
    console.log("au cas où : "+JSON.stringify(this.reponseAPIconcat));
    return new Promise (function(){this.reponseAPIconcat});
  }






  private async searchWithDepartement(recherche : Recherche, url: string){
    let listeCP = this.cpDepartement(recherche.departement);
    if (recherche.effectifs != null) {
      for (let cp of listeCP) {
        let urlLevelTwo = url + "&code_postal=" + cp;
        console.log("urlLevelTwo : "+urlLevelTwo);
        this.searchWithEffectif(recherche.effectifs,urlLevelTwo)
      }
    }  
    else{
      for (let cp of listeCP) {
        let urlLevelTwo = url + "&code_postal=" + cp;
        console.log("urlLevelTwo : "+urlLevelTwo);
        this.doSearch(urlLevelTwo)
      }
    }
  }

  private async searchWithEffectif(effectif : number, url: string) {
    let listeTranche = this.listeTracheEffectif(effectif);
    for (let tranche of listeTranche) {
      let urlLastLevel = url + "&tranche_effectifs=" + tranche;
      console.log("urlLastLevel : "+urlLastLevel);
      this.doSearch(urlLastLevel);
    }
  }

  private async doSearch(urlFinal: string){
      let result = this.http.get<ReponseApiEtablissements>(urlFinal);
      result.subscribe(async (reponse) => {
        this.reponseAPIconcat.meta.total_results = this.reponseAPIconcat.meta.total_results + reponse.meta.total_results;
        console.log("nbResultat doSearch: " + this.reponseAPIconcat.meta.total_results);
        this.reponseAPIconcat.etablissements = reponse.etablissements;
        console.log("end doSearch : "+JSON.stringify(this.reponseAPIconcat));
      },
      (err) => { console.log(err); }
      )  
      console.log("Je suis au bout : "+JSON.stringify(this.reponseAPIconcat));
  }












  
  private urlLevelOne(recherche: Recherche): string {
    let extentionURL: string;

    if (recherche.siren != null) {
      let siren = "&siren=" + recherche.siren;
      extentionURL = extentionURL + siren;
    }
    if (recherche.denomination != null) {
      let denomination = "&denomnation=" + recherche.denomination;
      extentionURL = extentionURL + denomination;
    }
    if (recherche.date_creation != null) {
      let date_creation = "&date_creation=" + recherche.date_creation;
      extentionURL = extentionURL + date_creation;
    }
    if (recherche.libelle_commune != null) {
      let libelle_commune = "&libelle_commune=" + recherche.libelle_commune.toUpperCase();
      extentionURL = extentionURL + libelle_commune;
    }
    if (recherche.code_postal != null) {
      let code_postal = "&code_postal=" + recherche.code_postal;
      extentionURL = extentionURL + code_postal;
    }
    return extentionURL;
  }

  private listeTracheEffectif(valueEffectifs: number): any {
    let listeTranche;
    if (valueEffectifs == 1) { listeTranche = ["00", "01", "02", "03"] }
    else {if (valueEffectifs == 11) { listeTranche = [11]; }
      else { if (valueEffectifs == 12) { listeTranche = [12]; }
        else { if (valueEffectifs == 21) { listeTranche = [21]; }
          else { if (valueEffectifs == 22) { listeTranche = [22]; }
            else { if (valueEffectifs == 5) { listeTranche = [31, 32]; }
              else { listeTranche = [41, 42, 51, 52, 53];}
    }}}}}
    return listeTranche;
  }
  private cpDepartement(departement: string): string[] {
    let listeCP : Array<string> = new Array<string>();
    listeCP.push("77100");
    listeCP.push("30900");
    return listeCP;
  }

}