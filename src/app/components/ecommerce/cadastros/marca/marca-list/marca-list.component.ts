import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { MarcaEditComponent } from '../marca-edit/marca-edit.component';

export interface Obj {
  codigo: number;
  descricao: string;
  ativo: boolean;
}

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent extends BaseListRegisterComponent implements OnInit {

  listObj: Obj[] = [];
  filtro: string = '';

  get list() {

    let result = this.listObj;
    
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

    const dialogRef = this.dialog.open(MarcaEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }

  onDelete(action: any) {

  }

  onListar() {
    this._api.getMarca().subscribe({
      next: result => {
        this.base_carregando = true;
        this.listObj = [];
        result.forEach(o => {
          this.listObj.push({
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
