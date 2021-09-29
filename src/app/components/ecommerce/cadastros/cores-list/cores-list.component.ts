import { core } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';

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
    private _api: EcommerceService) { 
      super()
    }

  ngOnInit(): void {
    this.base_carregando = true;
    this.onListar();
  }

  onFiltrar(f: any) {
    this.filtro = f;
  }

  onListar() {
    this._api.getCor().subscribe({
      next: result => {
        this.base_carregando = true;
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
