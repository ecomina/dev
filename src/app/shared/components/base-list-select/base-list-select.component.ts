import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '../base/base.component';

export interface DialogData {
  titulo: string;
  list: any[];
  confirmou: boolean;
  obj: any
}

@Component({
  selector: 'app-base-list-select',
  templateUrl: './base-list-select.component.html',
  styleUrls: ['./base-list-select.component.css']
})
export class BaseListSelectComponent extends BaseComponent implements OnInit {

  base_list: any[] = [];
  filtro: string = "";
  
  get carregando() {
    return this.base_list.length == 0;
  }

  get list() {
    let result = this.base_list;
    
    if (this.filtro.length > 0)
      result =  result.filter(m => (m.id+m.descricao).toUpperCase().includes(this.filtro.toUpperCase()));

    return result;
  }

  constructor(
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<BaseComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      super();
      this.base_title = data.titulo;
      this.base_list = this.data.list;
    }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close(this.data)
  }

  onSelect(obj: any) {
    this.data.confirmou = true;
    this.data.obj = obj;
    this.onClose();
  }

  onFiltrar(event: any) {
    this.filtro = event;
  }

}
