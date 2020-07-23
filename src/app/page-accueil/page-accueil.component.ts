import { Component, OnInit } from '@angular/core';
import { StatsService } from '../common/service/stats.service';
import { ReponseMsStats } from '../common/data/reponse-msstats';


@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {

  shownStat: ReponseMsStats[];

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
