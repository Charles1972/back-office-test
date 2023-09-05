import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eCustomButtonWidth, eDetailFormInputType, eDetailFormType, ePopupIcon, eTextAlign } from 'src/app/helpers/classes/enums';
import { IDetailFormConfiguration, IDetailsFormDataUpdate } from 'src/app/helpers/classes/interfaces';
import { DetailFormComponent } from 'src/app/helpers/components/detail-form/detail-form.component';
import { IProduct, IStore } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { toggleModal } from 'src/app/helpers/classes/shared-functions';


@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  @ViewChild('newProductForm') newProductForm?: DetailFormComponent;

  ePopupIcon = ePopupIcon;
  eCustomButtonWidth = eCustomButtonWidth;

  storeInfo: IStore;
  products: IProduct[] = [];
  productToDelete: IProduct = null;

  panelLayoutActive: boolean = true;
  page: number = 1;

  showAddNewProduct: boolean = false;
  newFormConfigurations: IDetailFormConfiguration[] = [];
  selectsLists: any[] = [];

  addNewText: string = 'Nuovo Prodotto';

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
      this.getResolvedData();
      this.initNewForm();
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

  private initNewForm() {
    let employees: any[] = this.dataService.storeInfo.employees.map((employee: string) => {
      return { uuid: employee, name: employee };
    })

    employees = [...[{uuid: '', name: '-'}], ...employees]

    this.selectsLists['employee'] = employees;

    this.newFormConfigurations = [
      {key: 'title', label: 'Titolo', type: eDetailFormType.input, validationRequired: true, colLength: 4},
      {key: 'price', label: 'Prezzo', type: eDetailFormType.input, inputType: eDetailFormInputType.number,
        number: {min: 0, step: 0.01}, colLength: 2, validationRequired: true, textAlign: eTextAlign.center},
      {key: 'category', label: 'Categoria', type: eDetailFormType.input, validationRequired: true},
      {key: 'employee', label: 'Dipendente', type: eDetailFormType.select,
        selectItems: {bindId: 'uuid', bindValue: 'name', placeholder: 'Seleziona un dipendente'}},
      {key: 'description', label: 'Descrizione', type: eDetailFormType.textArea},
      {key: 'reviews_string', label: 'Recensioni', type: eDetailFormType.textArea},
    ];
  }

  newProductDataUpdate(data: IDetailsFormDataUpdate) {
    if (data.items['reviews_string']) {
      data.items['reviews'] = data.items['reviews_string'].split('\n');
      data.items['reviews_string'] = null;
    }

    if (data.items['employee'] && data.items['employee'] == '-') {
      data.items['employee'] = null;
    }

    for (var key in data.items) {
      if (data.items.hasOwnProperty(key) && data.items[key] == null) {
        delete data.items[key];
      }
    }

    this.dataService.insertProduct(<IProduct>data.items).subscribe(
      () => {
        this.getProducts();
        this.showHideAddedNewProductInfo(true);
      }
    )
  }

  private getProducts() {
    this.dataService.getProducts().subscribe(
      (response: IProduct[]) => {
        this.products = response;
        this.onAddNewCancel();
      }
    )
  }

  onAddNewCancel() {
    this.newProductForm?.reset();
    this.showAddNewProduct = false;
  }

  onProductDelete(product: IProduct) {
    this.productToDelete = product;

    this.showHideDeleteProduct(true);
  }

  deleteProduct() {
    this.showHideDeleteProduct(false);

    this.dataService.deleteProduct(this.productToDelete.id).subscribe(
      () => {
        this.getProducts()
      }
    )
  }

  showHideAddedNewProductInfo(show: boolean) {
    toggleModal('add-new-popup', show);
  }

  showHideDeleteProduct(show: boolean) {
    toggleModal('delete-popup', show);
  }
}
