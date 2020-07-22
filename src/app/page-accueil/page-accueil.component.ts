import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../common/data/etablissement';
import { StatsService } from '../common/service/stats.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {

  shownStat: Etablissement[];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.initYesterday();
  }

  initYesterday(){
    this.statsService.initYesterday().subscribe(
      (data)=>{this.shownStat=data;}
    )
  }

}
