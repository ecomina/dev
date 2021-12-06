import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BaseListFilterComponent } from '@app/shared/components/base-list-filter/base-list-filter.component';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PedidoFilterComponent } from '../pedido-filter/pedido-filter.component';

export interface DialogData {
  filtrar: Boolean;
  filtros: BaseFilter[]}

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent extends BaseListFilterComponent implements OnInit {

  get list() {

    let result = this.base_list;

    if (this.txt_pesquisa.length > 0)
      result =  result.filter(m => (m.codigo).includes(this.txt_pesquisa.toUpperCase()));

    return result;
  }

  constructor(
    private _api: EcommerceService,
    private _router: Router,
    public matDialog: MatDialog) { 
    super(matDialog);
  }

  ngOnInit(): void {
  }

  onFiltrar(f: any) {

    const data: DialogData = {
      filtrar: false,
      filtros: this.baseFilters
    }

    const dialogRef =  this.baseDialogCtor(PedidoFilterComponent, {
      data: data
    })

    dialogRef.afterClosed().subscribe(result => {
      this.baseFilters = result.filtros;
      this.onListar(result.filtros);
    })
  }

  onPesquisar(event: any) {
    this.txt_pesquisa = event;
  }

  onListar(filtros: any) {

    this.base_list = [];
    this.base_carregando = true;
    this._api.getPedidos(filtros)
      .pipe(
        take(1)
      )
      .subscribe({
        next: result => {
          result.forEach(o => {
            this.base_list.push(o);
          })
        },
        error: erro => {
          this.baseDialogError('Falha na tentativa de consulta.', erro);
        },
        complete: () => {
          this.base_carregando = false;
        }
      })
  }

  onEdit(pedido: any) {
    this._router.navigate(['pedido/edit', pedido.codigo])
  }

}
