import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-list-filter',
  templateUrl: './base-list-filter.component.html',
  styleUrls: ['./base-list-filter.component.css'],

})

export class BaseListFilterComponent extends BaseComponent implements OnInit {

  @Input() canFilter = false;
  @Input() baseFilters: BaseFilter[] = [];

  @Output() eventFilter = new EventEmitter();
  @Output() eventFilterShow = new EventEmitter();

  public base_list: any[] = [];
  
  public txt_pesquisa = '';

  get can_clear(): boolean {
    return (this.txt_pesquisa.length > 0);
  }

  get filters() {
    return this.baseFilters;
  }

  public baseDialogCtor<T>(TCtor: new (...args: any[]) => T, data: any): MatDialogRef<T,any> {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    console.log('data',dialogConfig.data )

    const dialogRef = this.matDialog.open(TCtor, dialogConfig);
    return dialogRef;
 }

  constructor(
    public matDialog: MatDialog
  ) { 
    super()
  }

  ngOnInit(): void {
  }

  baseFilterShow() {
    this.eventFilterShow.emit(true);
  }

  baseClear() {
    this.txt_pesquisa = '';
    this.eventFilter.emit(this.txt_pesquisa);
  }

  baseFilterList() {
    this.eventFilter.emit(this.txt_pesquisa);
  }  

  baseRemoveFilter(index: any) {
    this.baseFilters.splice(index, 1);
  }

}
