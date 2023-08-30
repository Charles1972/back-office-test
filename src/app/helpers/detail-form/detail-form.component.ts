import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {eCustomButtonWidth, eDetailFormInputType, eDetailFormType, eTextAlign} from "../classes/enums";
import {
  IDetailFormConfiguration,
  IDetailsFormDataUpdate,
  IDetailsFormInputChange,
  IDetailsFormSelectChange
} from '../classes/interfaces';
import {DomSanitizer} from "@angular/platform-browser";
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() configurations: IDetailFormConfiguration[] = [];
  @Input() item: any = null;
  @Input() isReadOnly: boolean = false;
  @Input() submitText = 'Submit';
  @Input() markOnTouched: boolean = false;
  @Input() isNew: boolean = false;
  @Input() autoCompletePassword: boolean = false;
  @Input() selectsLists: any[] = [];
  @Input() excludeDisabledItemsOnUpdate: boolean = true;
  @Input() showUpDownNumberAlways: boolean = false;
  @Input() hideUpDownNumberAlways: boolean = false;
  @Input() removeHiddenControls: boolean = true;
  @Input() small: boolean = false;

  @Output() submit = new EventEmitter<UntypedFormGroup>();
  @Output() dataUpdate = new EventEmitter<IDetailsFormDataUpdate>();
  @Output() selectChanged = new EventEmitter<IDetailsFormSelectChange>();
  @Output() inputChanged = new EventEmitter<IDetailsFormInputChange>();

  eCustomButtonWidth = eCustomButtonWidth;
  detailForm: UntypedFormGroup;
  submitted: boolean = false;
  showPassword: boolean = false;

  passwordImg: string = '';
  noPasswordImg = '';

  passwordKey: string = '';
  confirmPasswordKey: string = '';

  locale: string = '';
  configurationsFiltered: IDetailFormConfiguration[] = [];

  constructor(private formBuilder: UntypedFormBuilder,
              private el: ElementRef,
              private sanitizer: DomSanitizer,
              private _decimalPipe: DecimalPipe) {

    this.passwordImg = <string>this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJleWUtc2xhc2giIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUtc2xhc2ggZmEtdy0yMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48cGF0aCBmaWxsPSJibGFjayIgZD0iTTYzNCA0NzFMMzYgMy41MUExNiAxNiAwIDAgMCAxMy41MSA2bC0xMCAxMi40OUExNiAxNiAwIDAgMCA2IDQxbDU5OCA0NjcuNDlhMTYgMTYgMCAwIDAgMjIuNDktMi40OWwxMC0xMi40OUExNiAxNiAwIDAgMCA2MzQgNDcxek0yOTYuNzkgMTQ2LjQ3bDEzNC43OSAxMDUuMzhDNDI5LjM2IDE5MS45MSAzODAuNDggMTQ0IDMyMCAxNDRhMTEyLjI2IDExMi4yNiAwIDAgMC0yMy4yMSAyLjQ3em00Ni40MiAyMTkuMDdMMjA4LjQyIDI2MC4xNkMyMTAuNjUgMzIwLjA5IDI1OS41MyAzNjggMzIwIDM2OGExMTMgMTEzIDAgMCAwIDIzLjIxLTIuNDZ6TTMyMCAxMTJjOTguNjUgMCAxODkuMDkgNTUgMjM3LjkzIDE0NGEyODUuNTMgMjg1LjUzIDAgMCAxLTQ0IDYwLjJsMzcuNzQgMjkuNWEzMzMuNyAzMzMuNyAwIDAgMCA1Mi45LTc1LjExIDMyLjM1IDMyLjM1IDAgMCAwIDAtMjkuMTlDNTUwLjI5IDEzNS41OSA0NDIuOTMgNjQgMzIwIDY0Yy0zNi43IDAtNzEuNzEgNy0xMDQuNjMgMTguODFsNDYuNDEgMzYuMjljMTguOTQtNC4zIDM4LjM0LTcuMSA1OC4yMi03LjF6bTAgMjg4Yy05OC42NSAwLTE4OS4wOC01NS0yMzcuOTMtMTQ0YTI4NS40NyAyODUuNDcgMCAwIDEgNDQuMDUtNjAuMTlsLTM3Ljc0LTI5LjVhMzMzLjYgMzMzLjYgMCAwIDAtNTIuODkgNzUuMSAzMi4zNSAzMi4zNSAwIDAgMCAwIDI5LjE5Qzg5LjcyIDM3Ni40MSAxOTcuMDggNDQ4IDMyMCA0NDhjMzYuNyAwIDcxLjcxLTcuMDUgMTA0LjYzLTE4LjgxbC00Ni40MS0zNi4yOEMzNTkuMjggMzk3LjIgMzM5Ljg5IDQwMCAzMjAgNDAweiI+PC9wYXRoPjwvc3ZnPgo=');
    this.noPasswordImg = <string>this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJleWUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUgZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSJibGFjayIgZD0iTTI4OCAxNDRhMTEwLjk0IDExMC45NCAwIDAgMC0zMS4yNCA1IDU1LjQgNTUuNCAwIDAgMSA3LjI0IDI3IDU2IDU2IDAgMCAxLTU2IDU2IDU1LjQgNTUuNCAwIDAgMS0yNy03LjI0QTExMS43MSAxMTEuNzEgMCAxIDAgMjg4IDE0NHptMjg0LjUyIDk3LjRDNTE4LjI5IDEzNS41OSA0MTAuOTMgNjQgMjg4IDY0UzU3LjY4IDEzNS42NCAzLjQ4IDI0MS40MWEzMi4zNSAzMi4zNSAwIDAgMCAwIDI5LjE5QzU3LjcxIDM3Ni40MSAxNjUuMDcgNDQ4IDI4OCA0NDhzMjMwLjMyLTcxLjY0IDI4NC41Mi0xNzcuNDFhMzIuMzUgMzIuMzUgMCAwIDAgMC0yOS4xOXpNMjg4IDQwMGMtOTguNjUgMC0xODkuMDktNTUtMjM3LjkzLTE0NEM5OC45MSAxNjcgMTg5LjM0IDExMiAyODggMTEyczE4OS4wOSA1NSAyMzcuOTMgMTQ0QzQ3Ny4xIDM0NSAzODYuNjYgNDAwIDI4OCA0MDB6Ij48L3BhdGg+PC9zdmc+Cg==');
  }

  ngOnInit(): void {
    this.setData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.configurations && this.configurations.length > 0) {
      this.configurationsFiltered = this.configurations.filter(c => !c.hidden);
      this.initForms();
    }

    if (changes.isReadOnly) {
      this.onReadOnlyChange();
    }

    if (changes.item) {
      this.setData();
    }

    if (changes.selectsLists && this.selectsLists) {
      this.setSelectsLists();
    }

    if (changes.isNew) {
      this.onNew();
    }
  }

  private initForms() {
    this.detailForm = this.formBuilder.group({});

    for (let i = 0; i < this.configurations.length; i++) {
      let conf = this.configurations[i];
      this.detailForm.addControl(conf.key, new UntypedFormControl(''));
      let ctrl = this.detailForm.get(conf.key);
      if (ctrl) {
        if (conf.inputType == eDetailFormInputType.password) {
          if (conf.matchPasswordValidator) {
            this.confirmPasswordKey = conf.key;
          }
          else {
            this.passwordKey = conf.key;
          }
        }

        this.addValidators(ctrl, conf);
      }
    }

    this.onReadOnlyChange();
  }

  private addValidators(ctrl: AbstractControl, conf: IDetailFormConfiguration) {
    if (conf.validationRequired && !conf.hidden) {
      if (conf.type == eDetailFormType.checkbox) {
        ctrl.addValidators(Validators.requiredTrue);
      }
      else {
        ctrl.addValidators(Validators.required);
      }

      if (conf.customValidatorPattern && conf.customValidatorPattern.trim() != '') {
        ctrl.addValidators(Validators.pattern(conf.customValidatorPattern));
      }
      if (conf.number?.min) {
        ctrl.addValidators(Validators.min(conf.number?.min));
      }
      if (conf.number?.max) {
        ctrl.addValidators(Validators.max(conf.number?.max));
      }
      if (conf.stringLength?.min) {
        ctrl.addValidators(Validators.minLength(conf.stringLength?.min));
      }
      if (conf.stringLength?.max) {
        ctrl.addValidators(Validators.maxLength(conf.stringLength?.max));
      }
      if (conf.matchPasswordValidator) {
        ctrl.addValidators(this.checkPasswords);
      }
    }
  }

  private getV = (obj, key) => {
    const keys = key.split(".");
    let value = obj;
    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
      if (!value) {
        break;
      }
    }
    return value;
  };

  setData() {
    if (this.detailForm) {
      if (this.isReadOnly) {
        //Temporary re-enable controls otherwise some controls don't change value
        this.detailForm.enable();
      }
      this.reset();

      for (let i = 0; i < this.configurations.length; i++) {
        let conf = this.configurations[i];
        let ctrl = this.detailForm.get(conf.key);
        let key = conf.key.replace(/->/g, '.');
        let value = null;
        if (this.item) {
          try {
            value = key.split('.').reduce(function(p,prop) { return p[prop] }, this.item);
          } catch (error) {
            if (conf.type == eDetailFormType.input) {
              value = conf.inputType == eDetailFormInputType.number ? 0 : '';
            }
          }
        }

        if (value == null && conf.defaultValue != null) {
          value = conf.defaultValue;
        }

        if (ctrl && value != null) {
          ctrl.setValue(value);

          if ((conf.disabled && !this.isNew) || conf.alwaysDisabled) {
             ctrl.disable();
          }
        }
      }

      if (this.isReadOnly) {
        this.detailForm.disable();
      }
    }
  }

  getTextAlign(v: eTextAlign, i: eDetailFormInputType) {
    if (i == eDetailFormInputType.number) {
      return 'text-center';
    }
    else {
      if (v) {
        switch (v) {
          case eTextAlign.left:
            return 'text-left';
          case eTextAlign.center:
            return 'text-center';
          case eTextAlign.right:
            return 'text-right';
        }
      }

      return '';
    }
  }

  private setSelectsLists() {

  }

  onReadOnlyChange() {
    if (this.detailForm) {
      if (this.isReadOnly) {
        this.detailForm.disable();
      }
      else {
        this.detailForm.enable();

        if (this.configurations.length > 0) {
          for (let i = 0; i < this.configurations.length; i++) {
            let conf = this.configurations[i];
            let ctrl = this.detailForm.get(conf.key);
            if (ctrl) {
              if ((conf.disabled && !this.isNew) || conf.alwaysDisabled) {
                ctrl.disable();
              }
            }
          }

          this.setFocusOnFirstElement();
        }
      }
    }
  }

  onNew() {
    if (this.isNew) {
      this.reset();
      this.isReadOnly = false;
      this.onReadOnlyChange();

      if (this.configurations.length > 0) {
        for (let i = 0; i < this.configurations.length; i++) {
          let conf = this.configurations[i];
          let ctrl = this.detailForm.get(conf.key);
          if (ctrl) {
            if (conf.type == eDetailFormType.checkbox) {
              ctrl.setValue(false);
            }
            if (conf.alwaysDisabled) {
               ctrl.disable();
            }
          }
        }

        this.setFocusOnFirstElement();
      }
    }
  }

  onSelectChange(key: string, e: any) {
    this.selectChanged.emit({key: key , value: e});
  }

  onInputChange(key: string, e: any) {
    this.inputChanged.emit({key: key , value: e});
  }

  private setFocusOnFirstElement() {
    let ctrl = this.el.nativeElement.querySelector('[ng-reflect-name="' + this.configurations[0].key + '"]');
    if (ctrl) {
      ctrl.focus();
    }
  }

  get detailControls() {
    return this.detailForm.controls;
  }

  get eFormType(): typeof eDetailFormType {
    return eDetailFormType;
  }

  get eInputType(): typeof eDetailFormInputType {
    return eDetailFormInputType;
  }

  getInputType(config: IDetailFormConfiguration) {
    switch (config.inputType) {
      case eDetailFormInputType.email:
        return 'email';
      case eDetailFormInputType.number:
        return 'number';
      case eDetailFormInputType.url:
        return 'url';
      case eDetailFormInputType.tel:
        return 'tel';
    }

    if (config.inputType == eDetailFormInputType.password && !this.showPassword) {
      return 'password';
    }

    return 'text';
  }

  getInputAutocomplete(config: IDetailFormConfiguration) {
    switch (config.key) {
      case 'name':
        return 'name';
      case 'first-name':
      case 'firstName':
        return 'given-name';
      case 'middle-name':
      case 'middleName':
        return 'additional-name';
      case 'username':
        return 'username';
      case 'password':
        if (!this.autoCompletePassword) {
          return 'new-password';
        }
    }

    return 'on';
  }

  onSubmit() {
    this.submit.emit(this.detailForm);
    this.submitted = true;

    if (this.detailForm.invalid) {
      console.log('this.detailForm.invalid', this.detailForm)
      this.scrollToFirstInvalidControl();
      return;
    }

    let itemsOut: any = {};
    for(let objKey in this.detailControls){
      let item = this.detailControls[objKey];
      let conf = this.configurations.find( conf => conf.key == objKey);
      if (this.excludeDisabledItemsOnUpdate && ((conf.disabled && ! this.isNew) || conf.alwaysDisabled)) {
        //The item will not be added on updated
      }
      else {
        if (conf.type == eDetailFormType.input && conf.inputType == eDetailFormInputType.number) {
          itemsOut[objKey] = Number(item.value);
        }
        else if (conf.type == eDetailFormType.checkbox) {
          itemsOut[objKey] = Boolean(item.value);
        }
        else if (conf.type == eDetailFormType.date && item.value != null) {
          let model: IMyDateModel = item.value;
          if (conf.dateOptions.dateRange) {
            // let d1 = model.dateRange.beginJsDate;
            // d1.setHours(0,0,0, 0);
            // let d2 = model.dateRange.endJsDate;
            // d2.setHours(0,0,0, 0);
            itemsOut[objKey] = model.dateRange.formatted; //d1.toISOString() + ' - ' + d2.toISOString();
          }
          else {
            // let d = model.singleDate.jsDate;
            // d.setHours(0,0,0, 0);
            itemsOut[objKey] = model.singleDate.formatted; // d.toISOString();
          }
        }
        else {
          itemsOut[objKey] = item.value
        }
      }
    }

    this.dataUpdate.emit({isNew: this.isNew, items: itemsOut});
  }

  private scrollToFirstInvalidControl() {
    setTimeout(() => {
      const firstInvalidControl: HTMLElement = this.el.nativeElement.getElementsByClassName('ng-invalid error')[0];
      if (firstInvalidControl) {
        firstInvalidControl.focus();
      }
    }, 200);
  }

  reset(reloadData: boolean = false) {
    if (this.detailForm) {
      if (reloadData) {
        this.setData();
      }
      else {
        this.detailForm.reset();
      }
    }
    this.submitted = false;
  }

  getValue(key: string): any {
    if (this.detailForm) {
      let ctrl = this.detailForm.get(key);

      if (ctrl) {
        return ctrl.value;
      }
    }

    return null;
  }

  setValue(key: string, value: any) {
    if (this.detailForm) {
      let ctrl = this.detailForm.get(key);

      if (ctrl) {
        ctrl.setValue(value);
      }
    }
  }

  changeFieldValue(key: string, value: any) {
    let ctrl = this.detailForm.get(key);
    if (ctrl) {
      ctrl.setValue(value);
    }
  }

  changeFieldDisable(key: string, disabled: boolean) {
    let ctrl = this.detailForm.get(key);
    if (ctrl) {
      disabled ? ctrl.disable(): ctrl.enable();
    }
  }

  changeFieldValidation(key: string, validationRequired: boolean) {
    let ctrl = this.detailForm.get(key);
    if (ctrl) {
      validationRequired ? ctrl.addValidators(Validators.required) : ctrl.removeValidators(Validators.required);
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = this.detailForm.get(this.passwordKey).value;
    let confirmPass = this.detailForm.get(this.confirmPasswordKey).value
    return pass === confirmPass ? null : { notSame: true }
  }
}
