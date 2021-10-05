import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { DimensaoEditComponent } from '../dimensao-edit/dimensao-edit.component';

@Component({
  selector: 'app-dimensao-list',
  templateUrl: './dimensao-list.component.html',
  styleUrls: ['./dimensao-list.component.css']
})
export class DimensaoListComponent extends BaseListRegisterComponent implements OnInit {

  dimensoes: any[] = [];
  filtro: string = '';

  get list() {

    let result = this.dimensoes;
    
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

    const dialogRef = this.dialog.open(DimensaoEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }

  onDelete(action: any) {

  }

  onListar() {
    this._api.getDimensao().subscribe({
      next: result => {
        this.base_carregando = true;
        this.dimensoes = [];
        result.forEach(o => {
          this.dimensoes.push({
            codigo: o.codigo,
            descricao: o.descricao,
            dimensaoProduto: o.dimensaoProduto,
            dimensaoEmbalagem: o.dimensaoEmbalagem})
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
