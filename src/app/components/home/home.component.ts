import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IStore } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  storeInfo: IStore;
  products: IProduct[] = [];

  panelLayoutActive: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private s: DataService) {
  }

  ngOnInit(): void {
      this.getResolvedData();
  }

  private getResolvedData() {
    this.activatedRoute.data.subscribe(
      ({storeData, productsData}) => {
        this.storeInfo = storeData;
        this.products = productsData;
        console.log('this.storeInfo', this.storeInfo, this.products)
      }
    );
  }
}
