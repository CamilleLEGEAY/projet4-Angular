import { Component, OnInit } from '@angular/core';
import { RecherchesService } from '../common/service/recherches.service';
import { Etablissement } from '../common/data/etablissement';

@Component({
  selector: 'app-page-resultat',
  templateUrl: './page-resultat.component.html',
  styleUrls: ['./page-resultat.component.scss']
})
export class PageResultatComponent implements OnInit {

  allEtablissement:Etablissement[];
  shownEtablissement:Etablissement[];

  constructor(private recherchesService : RecherchesService) {
    this.start();    
  }
  
  ngOnInit(): void {
  }

  start():void{
    this.recherchesService.getAll()
    .subscribe(
      (reponse)=>{
        this.allEtablissement = reponse ;
        this.shownEtablissement = this.allEtablissement;
      },
      (err)=>{console.log(err);}
    )
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
