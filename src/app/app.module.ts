import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NGXLoaderInterceptorService} from "./interceptors/loader-interceptor";
import { NgxPaginationModule } from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetailFormComponent } from './helpers/components/detail-form/detail-form.component';
import { CustomButtonComponent } from './helpers/components/custom-button/custom-button.component';
import { ButtonsGroupComponent } from './helpers/components/buttons-group/buttons-group.component';
import { PanelGridComponent } from './helpers/components/panel-grid/panel-grid.component';
import { DecimalPipe } from '@angular/common';
import { ModalComponent } from './helpers/components/modal/modal.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';
import { TabComponent } from './helpers/components/tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductManagerComponent,
    ProductStatsComponent,

    DetailFormComponent,
    ModalComponent,
    CustomButtonComponent,
    ButtonsGroupComponent,
    PanelGridComponent,
    TabComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxPaginationModule
  ],
  providers: [
    DecimalPipe,
    {provide: HTTP_INTERCEPTORS, useClass: NGXLoaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
