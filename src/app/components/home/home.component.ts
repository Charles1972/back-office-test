import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITab } from 'src/app/helpers/classes/interfaces';
import { IStore } from 'src/app/models/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  storeInfo: IStore;
  tabConfiguration: ITab[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getResolvedData();
    this.initConfiguration();
  }

  private getResolvedData() {
    this.activatedRoute.data.subscribe(({ storeData }) => {
      this.storeInfo = storeData;
    });
  }

  private initConfiguration() {
    this.tabConfiguration = [
      {label: 'Gestione Prodotti', link: 'products'},
      {label: 'Statistiche', link: 'stats'}
    ];
  }
}
