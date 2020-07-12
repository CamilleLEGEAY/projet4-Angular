import { Component, OnInit } from '@angular/core';
import { RecherchesService, urlEtablissement } from '../common/service/recherches.service';
import { Etablissement } from '../common/data/etablissement';
import { ExportDataService } from '../common/service/export-data.service';
import { Builder } from '../common/dao/builder';
import { Recherche } from '../common/data/recherche';
import { ReponseApiEtablissements } from '../common/data/reponses-api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-page-resultat',
  templateUrl: './page-resultat.component.html',
  styleUrls: ['./page-resultat.component.scss']
})
export class PageResultatComponent implements OnInit {

  builder: Builder = new Builder();
  allEtablissement: Etablissement[];
  shownEtablissement: Etablissement[];
  recherche: Recherche = new Recherche();
  nbResultat: number;
  departements: any[];



  constructor(private recherchesService: RecherchesService, private exportData: ExportDataService) {
    this.start();
    this.initDepartements();
  }

  ngOnInit(): void {
  }

  start(): void {
    this.recherchesService.getPageOne()
      .subscribe(
        (reponse) => {
          if (this.shownEtablissement === undefined) {
            this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponse.etablissements);
            this.nbResultat = reponse.meta.total_results;
            console.log("liste par défaut chargé");
          }
        },
        (err) => {
          console.log(err);
        }
      )
  }

  /**
   * fill the selector HTML
   */
  initDepartements(): void {
    this.recherchesService.initDepartements()
      .subscribe(
        (reponse) => {
          this.departements = reponse;
          console.log("departements filled");
        },
        (err) => {
          console.log(err);
        }
      )
  }

  createExcel() {
    //this.recherchesService.getExtraction(this.recherche)
    if (this.allEtablissement[1000000] === null) {
      this.exportData.exportAsExcelFile(this.allEtablissement, "RLEF");
    }
  }
  
  /**
   * to know how many responses for a research and get first page
   */
  onRecherche() {
    console.log(this.recherche);
    let url = urlEtablissement + "&per_page=20&page=1";
    url = this.urlLevelOne(this.recherche, url);

    if (this.recherche.departement != null && this.recherche.code_postal === undefined || this.recherche.code_postal === "") {
      if (this.recherche.departement === "2A" || this.recherche.departement === "2B") {
        this.recherche.departement = "20";
      }
      console.log("I'm doing searchWithDepartement");
      this.searchWithDepartement(this.recherche, url);
    }
    else {
      if (this.recherche.effectifs != null) {
        console.log("I'm doing searchWithEffectif");
        this.searchWithEffectif(this.recherche.effectifs, url);
      }
      else {
        console.log("I'm doing doSearch");
        this.recherchesService.doSearch(url).subscribe((reponse) => {
          this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponse.etablissements);
          this.nbResultat = reponse.meta.total_results;
        },
          (err) => { console.log(err); }
        )
      }
    }
  }

  /**
   * fill the url with departement and may be effectif criteria and lauch doSearch
   * @param effectif 
   * @param url 
   */
  private async searchWithDepartement(recherche: Recherche, url: string) {
    let observableBatch = [];
    let reponseAPIconcat: ReponseApiEtablissements = new ReponseApiEtablissements();
    let listeCP = this.recherchesService.cpDepartement(recherche.departement);
    if (recherche.effectifs != null) {
      for (let cp of listeCP) {
        let urlLevelTwo = url + "&code_postal=" + cp;
        this.searchWithEffectif(recherche.effectifs, urlLevelTwo);
      }
    }
    else {
      for (let cp of listeCP) {
        let urlLevelTwo = url + "&code_postal=" + cp;
        observableBatch.push(this.recherchesService.doSearch(urlLevelTwo));
      }
      forkJoin<ReponseApiEtablissements>(observableBatch).subscribe((reponse) => {
        for (let rep of reponse) {
          reponseAPIconcat.meta.total_results = reponseAPIconcat.meta.total_results + rep.meta.total_results;
          reponseAPIconcat.etablissements = rep.etablissements;
        }
        this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponseAPIconcat.etablissements);
        this.nbResultat = reponseAPIconcat.meta.total_results;
      });
    }
  }
  /**
   * fill the url with effectif criteria and lauch doSearch
   * @param effectif 
   * @param url 
   */
  private async searchWithEffectif(effectif: number, url: string) {
    let observableBatch = [];
    let reponseAPIconcat: ReponseApiEtablissements = new ReponseApiEtablissements();
    let listeTranche = this.listeTrancheEffectif(effectif);
    for (let tranche of listeTranche) {
      let urlLastLevel = url + "&tranche_effectifs=" + tranche;
      observableBatch.push(this.recherchesService.doSearch(urlLastLevel))
    }
    forkJoin<ReponseApiEtablissements>(observableBatch).subscribe((reponse) => {
      for (let rep of reponse) {
        reponseAPIconcat.meta.total_results = reponseAPIconcat.meta.total_results + rep.meta.total_results;
        reponseAPIconcat.etablissements = rep.etablissements;
      }
      this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponseAPIconcat.etablissements);
      this.nbResultat = reponseAPIconcat.meta.total_results;
    });
  }
  /**
   * fill url for research with basic criteria
   * @param recherche 
   */
  private urlLevelOne(recherche: Recherche, url: string): string {
    let extentionURL = url;

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
  /**
   * prepare the the research with the effectif criteria
   * @param valueEffectifs 
   */
  private listeTrancheEffectif(valueEffectifs: number): any {
    let listeTranche;
    if (valueEffectifs == 1) { listeTranche = ["00", "01", "02", "03"] }
    else {
      if (valueEffectifs == 11) { listeTranche = [11]; }
      else {
        if (valueEffectifs == 12) { listeTranche = [12]; }
        else {
          if (valueEffectifs == 21) { listeTranche = [21]; }
          else {
            if (valueEffectifs == 22) { listeTranche = [22]; }
            else {
              if (valueEffectifs == 5) { listeTranche = [31, 32]; }
              else { listeTranche = [41, 42, 51, 52, 53]; }
            }
          }
        }
      }
    }
    return listeTranche;
  }
}
