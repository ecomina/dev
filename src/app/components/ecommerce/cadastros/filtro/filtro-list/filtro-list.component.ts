import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    public _router: Router,
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
    this._router.navigate(['cadastros/filtro/edit/new'])
  }

  onEdit(codigo: any) {
    this._router.navigate(['cadastros/filtro/edit', codigo])
  }

  onDelete(action: any) {}

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
