import {
  eDetailFormInputType,
  eDetailFormType,
  eDetailType, eIcon,
  eTableItemType,
  eTableSortStatus,
  eTextAlign
} from "./enums";

export interface IDetailsFormDataUpdate {
  isNew: boolean;
  items: any;
}

export interface IDetailsFormSelectChange {
  key: string;
  value: any;
}

export interface IDetailsFormInputChange {
  key: string;
  value: any;
}

export interface IDetailFormConfiguration {
  key: string;
  label: string;
  type: eDetailFormType;
  validationRequired?: boolean;
  fullRow?: boolean;
  colLength?: number;
  inputType?: eDetailFormInputType;
  customValidatorPattern?: string;
  matchPasswordValidator?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  alwaysDisabled?: boolean;
  multiSelect?: boolean;
  textAlign?: eTextAlign;
  defaultValue?: any;
  stringLength?: {
    min?: number;
    max?: number;
  }
  number?: {
    min?: number;
    max?: number;
    step?: number
  }
  selectItems?: {
    bindId: any;
    bindValue: any;
    placeholder?: string;
  }
  radioItems?: {
    label: string;
    value: any;
  }[];
  textAreaRows?: number;
  checkBoxTextSize?: number;
}

export interface IDetailConfiguration {
  key: string;
  label: string;
  type: eDetailType;
  fullRow?: boolean;
  colLength?: number;
  applyValueAsHTML?: boolean;
  class?: string;
  numberNotFormatted?: boolean;
  value?: any;
}


