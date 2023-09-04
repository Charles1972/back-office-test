import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/data.model';

@Component({
  selector: 'panel-grid',
  templateUrl: './panel-grid.component.html',
  styleUrls: ['./panel-grid.component.scss']
})
export class PanelGridComponent implements OnInit {
  @Input() products: IProduct[] = [];
  @Input() itemsPerPage: number = 6;
  @Input() page: number = 1;
  @Input() panelLayoutActive: boolean = true;

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onProductDelete = new EventEmitter<IProduct>();

  constructor() { }

  ngOnInit() {
  }

  pageChange(v: number) {
    this.page = v;
  }
}
