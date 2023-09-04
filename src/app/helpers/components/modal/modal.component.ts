import {AfterViewInit, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {toggleModal} from "../../classes/shared-functions";
import {ePopupIcon} from "../../classes/enums";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Input() titleCss: string = '';
  @Input() showSeparators: boolean = true;
  @Input() isBlocked: boolean = true;
  @Input() isPopup: boolean = false;
  @Input() popupMessage: string = '';
  @Input() normalSize: boolean = true;
  @Input() widthFull: boolean = true;
  @Input() showFooterButtons: boolean = true;
  @Input() popupIcon: ePopupIcon = ePopupIcon.ok;
  @Input() fitContent: boolean = false;
  @Input() modalCSS: string = '';
  @Input() alignCenter: boolean = true;
  @Input() alignCenterNotMobile: boolean = true;
  @Input() noMaxWidth: boolean = false;
  @Input() small: boolean = false;

  @Output() onClose = new EventEmitter();

  eIcon = ePopupIcon;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  exitOnClick() {
    if (!this.isBlocked) {
      this.closeModal(false);
    }
  }

  closeModal(ok: boolean) {
    toggleModal(this.modalId, false);
    this.onClose.emit();
  }
}
