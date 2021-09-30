import { core } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { CoresEditComponent } from '../cores-edit/cores-edit.component';

export interface Cor {
  codigo: number;
  descricao: string;
  ativo: boolean;
}

@Component({
  selector: 'app-cores-list',
  templateUrl: './cores-list.component.html',
  styleUrls: ['./cores-list.component.css']
})
export class CoresListComponent extends BaseListRegisterComponent implements OnInit {

  cores: Cor[] = [];
  filtro: string = '';

  get list() {

    let result = this.cores;
    
    if (this.filtro.length > 0)
      result =  result.filter(m => (m.descricao).toUpperCase().includes(this.filtro.toUpperCase()));

    return result;
  }

  constructor(
    private _api: EcommerceService,
    public dialog: MatDialog) { 
      super()
    }

  ngOnInit(): void {
    this.base_carregando = true;
    this.onListar();
  }

  onFiltrar(f: any) {
    this.filtro = f;
  }

  onAdd() {
    this.onEdit(null);  
  }

  onEdit(obj: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      confirmou: false,
      data: obj}

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CoresEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }

  onDelete(action: any) {

  }

  onListar() {
    this._api.getCor().subscribe({
      next: result => {
        this.base_carregando = true;
        this.cores = [];
        result.forEach(o => {
          this.cores.push({
            codigo: o.codigo,
            descricao: o.descricao,
            ativo: o.ativo})
        })
      },
      error: erro => {
        this.base_carregando = false;
        console.error(erro);
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

}
