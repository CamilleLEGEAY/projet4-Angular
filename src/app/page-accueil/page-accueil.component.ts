import { Component, OnInit } from '@angular/core';
import { StatsService } from '../common/service/stats.service';
import { ReponseMsStats } from '../common/data/reponse-msstats';
import { Chart } from 'node_modules/chart.js';
import { RecherchesService } from '../common/service/recherches.service';
import { environment } from 'src/environments/environment';
import { DateServices } from '../common/dao/date';
import { CompileShallowModuleMetadata } from '@angular/compiler';


@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {

  msStat: ReponseMsStats[];
  nbCreaYesterday: number;
  nbCreaMonth: number;


  //A vous
  departements: any[];
  departement: string;
  dateCreation: string;

  //utils
  dateBuilder: DateServices = new DateServices;

  constructor(private statsService: StatsService, private recherchesService: RecherchesService) { }

  ngOnInit(): void {
    this.initMonth();
    this.initYesterday();
    this.initDepartements();
  }

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

  initMonth() {
    this.nbCreaMonth = 0;
    this.statsService.initMonth().subscribe(
      (data) => {
        this.initLineCrea(data);
      }
    )
  }

  initYesterday() {
    let url = environment.urlEtablissement + "&per_page=20&page=1";
    url = url + "&date_creation=" + this.dateBuilder.yesterday(new Date());
    this.recherchesService.doSearch(url).subscribe(
      data => { this.nbCreaYesterday = data.meta.total_results }
    );
  }

  initLineCrea(data :ReponseMsStats[]) {
    let map: Map<string, number> = new Map();
    let listeData : number[]=[];
    let listeLabels:string[]=[];
    for (let item of data) {
      this.nbCreaMonth = this.nbCreaMonth + item.qtes;
      if (!map.has(item.date_creation)) {
        map.set(item.date_creation, item.qtes);
      }
      else {
        let itemSaved = map.get(item.date_creation);
        itemSaved = itemSaved + item.qtes;
        map.set(item.date_creation, itemSaved);
      }
    }
    for (var [key, value] of map) {
      listeData.push(value);
      listeLabels.push(key);
    }

    new Chart("lineCrea", {
      type: 'line',
      data: {
        labels: listeLabels,
        datasets: [{
          label: 'entreprises créées',
          data: listeData,
          backgroundColor: 'rgba(0, 137, 132, .2)',
          borderColor: 'rgba(0, 10, 130, .7)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
