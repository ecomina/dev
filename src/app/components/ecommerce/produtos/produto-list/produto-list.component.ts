import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { PageService } from '@app/core/services/page.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BaseListFilterComponent } from '@app/shared/components/base-list-filter/base-list-filter.component';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { ProdutoFilterComponent } from '../produto-filter/produto-filter.component';

export interface DialogData {
  filtrar: Boolean;
  filtros: BaseFilter[]}

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
  providers:[PageService]
})
export class ProdutoListComponent extends BaseListFilterComponent implements OnInit {

  filtro: string = '';

  get list() {

    let result = this.base_list;

    if (this.txt_pesquisa.length > 0)
    {   
      result =  result.filter(m => 
          ((m.categoriaPrincipal === null) ? '' : m.categoriaPrincipal.descricao).concat(
          ((m.descricaoReduzida == null) ? '*' : m.descricaoReduzida)).concat(
          ((m.marca === null) ? '' : m.marca.descricao)).concat(
          ((m.modelo === null) ? '' : m.modelo))
          .toUpperCase().includes(this.txt_pesquisa.toUpperCase()));

        console.log(result);
      }

    return result;
  }

  get imgSemfoto() : string {
    return "../../../../../assets/images/semfoto.jfif";
  }

  getCategoriaPrincipalDescricao(produto: any) {
    return (produto.categoriaPrincipal == null) ? '' : produto.categoriaPrincipal.descricao;
  }

  getMarcaDescricao(produto: any) {
    return (produto.marca == null) ? '' : produto.marca.descricao;
  }

  constructor(
    private _api: EcommerceService,
    private _router: Router,
    public matDialog: MatDialog
  ) { 
    super(matDialog);
    this.title_menu = 'Produto';
  }

  ngOnInit(): void {
    // this.onFiltrar(null);
  }

  onListar(filtros: any) {
    this.base_carregando = true;

    // this._api.getProduto(filtros)
    // .subscribe((res: HttpResponse<any>) => {
    //   console.log(res.headers.get('x-amzn-trace-id'))
    // })

    this._api.getProduto(filtros).subscribe({
      next: result => {
        this.base_list.length = 0;

        this.base_carregando = true;
        result.body.forEach((o: any) => {
          this.base_list.push(o)
        })
      },
      error: erro => {
        this.base_carregando = false;
        alert('Erro:'+ erro);
      },
      complete: () => {
        this.base_carregando = false;
      },
      
    })
  }

  onPesquisar(event: any) {
    this.txt_pesquisa = event;
  }

  onFiltrar(f: any) {

    const data: DialogData = {
      filtrar: false,
      filtros: this.baseFilters
    }

    const dialogRef =  this.baseDialogCtor(ProdutoFilterComponent, {
      data: data
    })

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result != undefined)
      {
        this.baseFilters = result.filtros;
        this.onListar(this.baseFilters);
      }
    })
  }
  onEdit(produto: any) {
    this._router.navigate(['produto/edit', produto.codigo])
  }

  onQuery() {
    this.onListar(this.baseFilters);
  }

}
