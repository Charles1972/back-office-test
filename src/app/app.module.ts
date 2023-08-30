import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NGXLoaderInterceptorService} from "./interceptors/loader-interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: NGXLoaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
