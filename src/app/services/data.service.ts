import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { IProduct, IStore } from "../models/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string = `${environment.apiUrl}`;
  private storeId: string = `${environment.store_id}`;

  storeInfo: IStore;

  constructor (private httpClient: HttpClient) {

  }

  getStore() {
    if (this.storeInfo) {
      return of(this.storeInfo);
    }
    else {
      return this.httpClient.get(this.baseUrl + '/stores/' + this.storeId).pipe(map(response => {
        this.storeInfo = <IStore>response;

        return response;
      }));
    }
  }

  getProducts() {
    return this.httpClient.get(this.baseUrl + '/stores/' + this.storeId + '/products');
  }

  insertProduct(data: IProduct) {
    return this.httpClient.post(this.baseUrl + '/stores/' + this.storeId + '/products', data, {responseType: 'text'});
  }

  getProduct(product_id: string) {
    return this.httpClient.get(this.baseUrl + '/stores/' + this.storeId + '/products/' + product_id);
  }

  deleteProduct(product_id: string) {
    return this.httpClient.delete(this.baseUrl + '/stores/' + this.storeId + '/products/' + product_id);
  }

  getStats() {
    return this.httpClient.get(this.baseUrl + '/stores/' + this.storeId + '/stats/categories');
  }
}
