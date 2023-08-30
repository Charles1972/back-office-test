import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot,  ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DataService } from "../services/data.service";

export const getStoreResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(DataService).getStore();
}
