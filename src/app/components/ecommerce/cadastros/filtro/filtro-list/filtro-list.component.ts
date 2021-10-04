import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { FiltroEditComponent } from '../filtro-edit/filtro-edit.component';

@Component({
  selector: 'app-filtro-list',
  templateUrl: './filtro-list.component.html',
  styleUrls: ['./filtro-list.component.css']
})
export class FiltroListComponent extends BaseListRegisterComponent implements OnInit {

  filtros: any[] = [];
  filtro: string = '';

  get list() {

    let result = this.filtros;
    
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

    const dialogRef = this.dialog.open(FiltroEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }

  onDelete(action: any) {

  }

  onListar() {
    this._api.getFiltro().subscribe({
      next: result => {
        this.base_carregando = true;
        this.filtros = [];
        result.forEach(o => {
          this.filtros.push({
            codigo: o.codigo,
            descricao: o.descricao,
            ativo: o.ativo,
            obrigatorio: o.obrigatorio,
            suportaItens: o.suportaItens})
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
