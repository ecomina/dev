import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent extends BaseListRegisterComponent implements OnInit {

  filtro: string = '';

  get list() {

    let result = this.base_list;

    if (this.filtro.length > 0)
    {   
      result =  result.filter(m => 
          ((m.categoriaPrincipal === null) ? '' : m.categoriaPrincipal.descricao).concat(
          ((m.descricaoReduzida == null) ? '*' : m.descricaoReduzida)).concat(
          ((m.marca === null) ? '' : m.marca.descricao)).concat(
          ((m.modelo === null) ? '' : m.modelo))
          .toUpperCase().includes(this.filtro.toUpperCase()));

        console.log(result);
      }

    return result;
  }

  constructor(
    private _api: EcommerceService,
    private _router: Router
  ) { 
    super();
  }

  ngOnInit(): void {
    this.onListar();
  }

  onListar() {
    this.base_carregando = true;
    this._api.getProduto(false).subscribe({
      next: result => {
        this.base_carregando = true;
        result.forEach(o => {
          this.base_list.push(o)
        })
      },
      error: erro => {
        this.base_carregando = false;
        alert('Erro:'+ erro);
      },
      complete: () => {
        this.base_carregando = false;
      }
      
    })
  }

  onFiltrar(event: any) {
    this.filtro = event;
  }

  onEdit(produto: any) {
    this._router.navigate(['produto/edit', produto.codigo])
  }

}
