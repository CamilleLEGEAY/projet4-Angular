import { Component, OnInit } from '@angular/core';
import { RecherchesService } from '../common/service/recherches.service';
import { Etablissement } from '../common/data/etablissement';
import { ExportDataService } from '../common/service/export-data.service';
import { Builder } from '../common/dao/builder';
import { Recherche } from '../common/data/recherche';

@Component({
  selector: 'app-page-resultat',
  templateUrl: './page-resultat.component.html',
  styleUrls: ['./page-resultat.component.scss']
})
export class PageResultatComponent implements OnInit {

  builder: Builder = new Builder();
  allEtablissement:Etablissement[];
  shownEtablissement:Etablissement[];
  recherche:Recherche= new Recherche();
  nbResultat : number;
  departements: any[];

  constructor(private recherchesService : RecherchesService, private exportData : ExportDataService) {   
    this.start(); 
    this.initDepartements();
  }
  
  ngOnInit(): void {
  }

  start():void{
    this.recherchesService.getPageOne()
    .subscribe(
      (reponse)=>{
        if(this.shownEtablissement === undefined){
        this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponse.etablissements) ;
        this.nbResultat = reponse.meta.total_results;
        console.log("liste par défaut chargé");}
      },
      (err)=>{console.log(err);
      }
    )
  }

  initDepartements():void{
    this.recherchesService.initDepartements()
    .subscribe(
      (reponse)=>{
        this.departements = reponse;
        console.log(this.departements);
      },
      (err)=>{console.log(err);
      }
    )
  }
/**
 * n'attend pas l'async, la reponseAPIconcat du service
 */
  async onRecherche(){
    console.log(this.recherche);
    this.recherchesService.postRecherche(this.recherche).then((resultat)=>{
    console.log("Je suis component : "+JSON.stringify(resultat));
    this.shownEtablissement = this.builder.arrayEtablissementBuilder(resultat.etablissements) ;
    this.nbResultat = resultat.meta.total_results;
  });
  }
  

  createExcel(){
    //this.recherchesService.getExtraction(this.recherche)
    if (this.allEtablissement[1000000]=== null){
    this.exportData.exportAsExcelFile(this.allEtablissement,"RLEF");
    }
  }

}
