import { Component, OnInit } from '@angular/core';
import { RecherchesService } from '../common/service/recherches.service';
import { Etablissement } from '../common/data/etablissement';
import { ExportDataService } from '../common/service/export-data.service';
import { Builder } from '../common/dao/builder';
import { Recherche } from '../common/data/recherche';
import { ReponseApiEtablissements } from '../common/data/reponses-api';
import { forkJoin } from 'rxjs';
import { UriProxyService } from '../common/dao/uri-proxy.service';
import { EtablissementEntrant } from '../common/data/etablissement-entrant';

@Component({
  selector: 'app-page-resultat',
  templateUrl: './page-resultat.component.html',
  styleUrls: ['./page-resultat.component.scss']
})
export class PageResultatComponent implements OnInit {

  //for front
  shownEtablissement: Etablissement[];
  recherche: Recherche = new Recherche();
  nbResultat: number = null;
  departements: any[];
  listeCP: any[];

  //local
  builder: Builder = new Builder();
  reponseAPIconcat: ReponseApiEtablissements = new ReponseApiEtablissements();

  constructor(private recherchesService: RecherchesService, private exportData: ExportDataService, private proxy: UriProxyService) {
    this.initDepartements();
  }

  ngOnInit(): void {
  }

  /**
   * fill the selector HTML
   */
  initDepartements(): void {
    this.recherchesService.initDepartements()
      .subscribe((reponse) => {
        this.departements = reponse;
        console.log("departements filled");
      },
        (err) => {
          console.log(err);
        }
      )
  }

  /**
   * fill the selector HTML
   */
  initCP(departement: string): void {
    this.recherchesService.initCP(departement)
      .subscribe((reponse) => {
        this.listeCP = reponse;
        console.log("CP filled");
      },
        (err) => {
          console.log(err);
        }
      )
  }
  
  onSaveResearch(){
    console.log(this.nbResultat);
    this.recherche.nb_resultats=this.nbResultat;
    this.recherchesService.postSearch(this.recherche).subscribe(
      (data)=>{console.log()}
    )
  }

  /**
   * to get every data of the research to produce the Excel fill
   */
  onCreateExcel() {
    console.log("extraction started");
    this.reponseAPIconcat = new ReponseApiEtablissements();
    let url = this.proxy.urlEtablissement + "&per_page=100";
    url = this.urlLevelOne(this.recherche, url);

    if (this.recherche.effectifs != null) {
      console.log("I'm doing extractionWithEffectif");
      this.extractionWithEffectif(this.recherche.effectifs, url);
    }
    else {
      console.log("I'm doing recupereAssembleMAJ");
      this.doSearchAndPrint(1, url);
    }
  }
  /**
   * lauch the recuperation of data + print
   * @param effectifs 
   * @param url 
   */
  private extractionWithEffectif(effectifs: number, url: string) {
    let listeTranche = this.listeTrancheEffectif(effectifs);
    for (let tranche in listeTranche) {
      let urlLastLevel = url + "&tranche_effectifs=" + listeTranche[tranche];
      console.log(urlLastLevel);
      this.doSearchAndPrint(1, urlLastLevel)
    }
  }
  /**
   * recursive pour récupération de toutes les entreprises à imprimer
   * launch print
   */
  private doSearchAndPrint(page: number, url: string) {
    let urlNewPage = url + "&page=" + page;
    this.recherchesService.doSearch(urlNewPage).subscribe((reponse) => {
      this.reponseAPIconcat.etablissements = this.reponseAPIconcat.etablissements.concat(reponse.etablissements);
      page++;
      if (reponse.meta.total_pages > reponse.meta.page) {
        this.doSearchAndPrint(page, url)
      }
      if (this.reponseAPIconcat.etablissements.length === this.nbResultat) {
        this.print(this.reponseAPIconcat.etablissements);
      }
    },
      (err) => { console.log(err); });
  }
  /**
   * print this.reponseAPIcancat.etablissement
   */
  private print(listeEtablissement : EtablissementEntrant[]){
    let allEtablissement = this.builder.arrayEtablissementBuilder(listeEtablissement);
    console.log("on va imprimer les " + allEtablissement.length + " entreprises");
    this.exportData.exportAsExcelFile(allEtablissement, "RLEF");
  }



  /**
   * to know how many responses for a research and get first page
   */
  onRecherche() {
    this.nbResultat = null;
    console.log(this.recherche);
    let url = this.proxy.urlEtablissement + "&per_page=20&page=1";
    url = this.urlLevelOne(this.recherche, url);

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
        (err) => { console.log(err); });
    }
  }
  /**
   * fill the url with effectif criteria and lauch doSearch
   * @param effectif 
   * @param url 
   */
  private async searchWithEffectif(effectif: number, url: string) {
    let observableBatch = [];
    this.reponseAPIconcat = new ReponseApiEtablissements();
    let listeTranche = this.listeTrancheEffectif(effectif);
    for (let tranche of listeTranche) {
      let urlLastLevel = url + "&tranche_effectifs=" + tranche;
      observableBatch.push(this.recherchesService.doSearch(urlLastLevel))
    }
    forkJoin<ReponseApiEtablissements>(observableBatch).subscribe((reponse) => {
      for (let rep of reponse) {
        this.reponseAPIconcat.meta.total_results = this.reponseAPIconcat.meta.total_results + rep.meta.total_results;
        this.reponseAPIconcat.etablissements = rep.etablissements;
      }
      this.shownEtablissement = this.builder.arrayEtablissementBuilder(this.reponseAPIconcat.etablissements);
      this.nbResultat = this.reponseAPIconcat.meta.total_results;
    },
      (err) => { console.log(err); });
  }
  /**
   * fill url for research with basic criteria
   * @param recherche 
   */
  private urlLevelOne(recherche: Recherche, url: string):string {
    let extentionURL = url;

    if (recherche.siren != null && recherche.code_postal != "") {
      let siren = "&siren=" + recherche.siren;
      extentionURL = extentionURL + siren;
    }
    if (recherche.denomination != null && recherche.code_postal != "") {
      let denomination = "&denomnation=" + recherche.denomination;
      extentionURL = extentionURL + denomination;
    }
    if (recherche.date_creation != null && recherche.code_postal != "") {
      let date_creation = "&date_creation=" + recherche.date_creation;
      extentionURL = extentionURL + date_creation;
    }
    if (recherche.libelle_commune != null && recherche.code_postal != "") {
      let libelle_commune = "&libelle_commune=" + recherche.libelle_commune.toUpperCase();
      extentionURL = extentionURL + libelle_commune;
    }
    if (recherche.code_postal != null && recherche.code_postal != "") {
      let code_postal = "&code_postal=" + recherche.code_postal;
      extentionURL = extentionURL + code_postal;
    }
    return extentionURL;
  }
  /**
   * prepare the the research with the effectif criteria
   * @param valueEffectifs 
   */
  private listeTrancheEffectif(valueEffectifs: number): any[] {
    var listeTranche = [];
    switch (valueEffectifs.toString()) {
      case '1':
        listeTranche = ["00", "01", "02", "03"];
        break;
      case '11':
        listeTranche = [11];
        break;
      case '12':
        listeTranche = [12];
        break;
      case '21':
        listeTranche = [21];
        break;
      case '22':
        listeTranche = [22];
        break;
      case '5':
        listeTranche = [31, 32];
        break;
      case '6':
        listeTranche = [41, 42, 51, 52, 53];
    }
    return listeTranche;
  }
}
