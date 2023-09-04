import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITab} from "../../classes/interfaces";

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() configuration: ITab[] = [];
  @Input() onlyButtons: boolean = false;
  @Input() growEnabled: boolean = true;
  @Input() small: boolean = false;
  @Input() activeCSS: string = '';
  @Input() inactiveCSS: string = '';
  @Input() borderCSS: string = '';
  @Input() activeOnClick: boolean = false;

  @Output() onClick = new EventEmitter<ITab>();
  constructor() { }

  ngOnInit(): void {
  }

  onLinkClick(tab: ITab) {
    if (this.activeOnClick) {
      for (let item of this.configuration) {
        item.isActiveOnClick = false;
      }
      tab.isActiveOnClick = true;
    }

    if (!tab.link) {
      this.onClick.emit(tab);
    }
  }
}
