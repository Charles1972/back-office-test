import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStatsCategories } from 'src/app/models/data.model';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-stats.component.html',
  styleUrls: ['./product-stats.component.scss']
})
export class ProductStatsComponent implements OnInit {
  statsData: IStatsCategories[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getResolvedData();
  }

  private getResolvedData() {
    this.activatedRoute.data.subscribe(({ statsData }) => {
      this.statsData = statsData;
    });
  }
}
