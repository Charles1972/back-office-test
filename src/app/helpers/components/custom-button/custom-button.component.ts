import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {eCustomButtonSize, eCustomButtonWidth} from "../../classes/enums";
import {toggleModal} from "../../classes/shared-functions";

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit, AfterViewInit {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() isSubmit: boolean = false;
  @Input() css: string = '';
  @Input() cssType: string = '';
  @Input() size: eCustomButtonSize = eCustomButtonSize.sm;
  @Input() width: eCustomButtonWidth = eCustomButtonWidth.none;
  @Input() toggleModalId: string = '';

  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.toggleModalId) {

    }
  }

  btnClick() {
    this.onClick.emit(this);

    if (this.toggleModalId != '') {
      toggleModal(this.toggleModalId, true);
    }
  }

  getType() {
    if (this.isSubmit) {
      return 'submit';
    }
    else {
      return 'button';
    }
  }

  getSize() {
    switch (this.size) {
      case eCustomButtonSize.xs:
        return 'text-xs ';
      case eCustomButtonSize.sm:
        return 'text-sm ';
      case eCustomButtonSize.base:
        return 'text-base ';
      case eCustomButtonSize.lg:
        return 'text-lg ';
      case eCustomButtonSize.xl:
        return 'text-xl ';
      case eCustomButtonSize.xl2:
        return 'text-2xl ';
      case eCustomButtonSize.xl3:
        return 'text-5xl ';
      case eCustomButtonSize.xl4:
        return 'text-7xl ';
      case eCustomButtonSize.xl5:
        return 'text-8xl ';
    }

    return '';
  }

  getWidth() {
    switch (this.width) {
      case eCustomButtonWidth.half:
        return 'w-6/12';
      case eCustomButtonWidth.full:
        return 'w-full';
    }

    return '';
  }
}

