import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private titlePageSource = new Subject<string>();

  titlePage$ = this.titlePageSource.asObservable();

  titlePage(title: string) {
    this.titlePageSource.next(title)
    console.log(title);
  }

  private _title_menu: string = '';
  get title_menu() {
    return this._title_menu;
  }
  
  set title_menu(title: string) {
    this._title_menu = title
  }

  constructor() { }
}
