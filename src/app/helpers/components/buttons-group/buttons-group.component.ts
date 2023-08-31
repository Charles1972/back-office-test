import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'buttons-group',
  templateUrl: './buttons-group.component.html',
  styleUrls: ['./buttons-group.component.scss']
})
export class ButtonsGroupComponent implements OnInit {
  @Input() panelText: string = 'Visualizzazione a Pannelli';
  @Input() gridText: string = 'Visualizzazione a Griglia';
  @Input() panelLayoutActive: boolean = true;

  @Output() onPanelLayoutActiveChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  panelLayoutActiveChange(v: boolean) {
    this.panelLayoutActive = v;
    this.onPanelLayoutActiveChange.emit(v);
  }
}
