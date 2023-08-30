import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { tap } from "rxjs/operators";

@Injectable()
export class NGXLoaderInterceptorService implements HttpInterceptor {
  constructor(private ngxLoader: NgxUiLoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.ngxLoader.start();

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.ngxLoader.stop();
        }
      },
      (err: any) => {
        this.ngxLoader.stop();
      }));
  }
}
