import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStatsCategories } from 'src/app/models/data.model';
import { ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-stats.component.html',
  styleUrls: ['./product-stats.component.scss']
})
export class ProductStatsComponent implements OnInit {
  statsData: IStatsCategories[] = [];
  height: string = '300px';
  width: string = '100%';

  legend = true;
  chartLabels: string[] = [];
  chartData: ChartData<'polarArea'> = null;
  chartType: ChartType = 'polarArea';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getResolvedData();
  }

  private getResolvedData() {
    this.activatedRoute.data.subscribe(({ statsData }) => {
      this.statsData = statsData;
      this.setChart();
    });
  }

  private setChart() {
    this.chartLabels = [];
    let data: number[] = [];

    for(let stat of this.statsData) {
      this.chartLabels.push(stat.category);
      data.push(stat.numberOfProducts);
    }

    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        {
          data: data,
          label: 'N. Prodotti',
        },
      ],
    };
  }
}
