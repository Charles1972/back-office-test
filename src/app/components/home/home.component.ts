import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  storeInfo: IStore;

  constructor(private activatedRoute: ActivatedRoute, private s: DataService) {
  }

  ngOnInit(): void {
      this.getResolvedData();
  }

  private getResolvedData() {
    this.activatedRoute.data.subscribe(({storeData}) => {
      this.storeInfo = storeData;
    });
  }
}
