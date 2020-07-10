import { Component, OnInit } from '@angular/core';
import { RecherchesService } from '../common/service/recherches.service';
import { Etablissement } from '../common/data/etablissement';
import { ExportDataService } from '../common/service/export-data.service';
import { Builder } from '../common/dao/builder';

@Component({
  selector: 'app-page-resultat',
  templateUrl: './page-resultat.component.html',
  styleUrls: ['./page-resultat.component.scss']
})
export class PageResultatComponent implements OnInit {

  allEtablissement:Etablissement[];
  shownEtablissement:Etablissement[];
  builder: Builder = new Builder();

  constructor(private recherchesService : RecherchesService, private exportData : ExportDataService) {
    this.start();    
  }
  
  ngOnInit(): void {
  }

  /**
   * to test avec MongoDB
   */
  /*start():void{
    this.recherchesService.getAll()
    .subscribe(
      (reponse)=>{
        this.allEtablissement = reponse ;
        this.shownEtablissement = this.allEtablissement;
      },
      (err)=>{console.log(err);}
    )
  }*/
  /**
   * to test avec API
   */
  start():void{
    this.recherchesService.getAll()
    .subscribe(
      (reponse)=>{
        this.shownEtablissement = this.builder.arrayEtablissementBuilder(reponse.etablissements) ;
        console.log(this.shownEtablissement);
      },
      (err)=>{console.log(err);}
    )
  }

  createExcel(){
    if (this.shownEtablissement[1000000]=== null){
    this.exportData.exportAsExcelFile(this.shownEtablissement,"RLEF");
    }
  }

  /*findAll(){
    this.recherchesService.getAll()
    .subscribe(
      (reponse)=>{
        this.allEtablissement = reponse ;
      },
      (err)=>{console.log(err);}
    )
  }*/
}
