import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { TamanhoEditComponent } from '../tamanho-edit/tamanho-edit.component';

export interface Obj {
  codGradeEcommerce: number;
  codigo: number;
  descricao: string;
  ordem: number;
  ativo: boolean;
}

@Component({
  selector: 'app-tamanho-list',
  templateUrl: './tamanho-list.component.html',
  styleUrls: ['./tamanho-list.component.css']
})
export class TamanhoListComponent  extends BaseListRegisterComponent implements OnInit {

  listObj: Obj[] = [];
  list_grades: any[] = [];

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
    dialogConfig.width = "100%";

    const dialogRef = this.dialog.open(TamanhoEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }

  onDelete(action: any) {

  }

  onListar() {
    this._api.getTamanho().subscribe({
      next: result => {
        this.base_carregando = true;
        this.listObj = [];
        result.forEach(o => {
          this.listObj.push({
            codGradeEcommerce: o.codGradeEcommerce,
            codigo: o.codigo,
            descricao: o.descricao,
            ordem: o.ordem,
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
