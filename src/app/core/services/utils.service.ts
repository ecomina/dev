import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(
    private _breakpointObserver: BreakpointObserver) { }

  formataData(data: Date) {
    return formatDate(data, 'dd/MM/yyyy', 'en-US')
  }

  dataParam(data: Date) {
    return formatDate(data, 'yyyy-MM-dd', 'en-US');
  }

  isMobile() {

    let mobile = false;
    this._breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge])
      .subscribe((state: BreakpointState) => {
        mobile =  (state.breakpoints[Breakpoints.XSmall])
      })

    return mobile;
  }
  
}
