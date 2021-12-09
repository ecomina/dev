import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { PageService } from '@app/core/services/page.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BasePaginacao } from '@app/modules/BasePaginacao';
import { BaseListFilterComponent } from '@app/shared/components/base-list-filter/base-list-filter.component';
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
    this.base_paginacao = new BasePaginacao;
  }

  ngOnInit(): void {
    const ultimofiltro = localStorage.getItem('produtoUltimoFiltro');
  
    //if (ultimofiltro != "") {

      this.baseFilters.length = 0;
      let listObj: BaseFilter[];
      
      const json = String(ultimofiltro);
      
      listObj = JSON.parse(json)

    if (listObj.length > 0) {
      this.baseFilters.length = 0;
      this.baseFilters = listObj;
      

      this.onListar(this.baseFilters)
    }
  }

  onListar(filtros: any) {
    this.base_carregando = true;

  
    this._api.getProduto(filtros, this.base_paginacao).subscribe({
      next: result => {
        this.base_list.length = 0;
        this.base_carregando = true;
        
        this.basePaginacao(result.headers.get('x-paginacao'));


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

  onPaginar(event: BasePaginacao) {
    this.basePaginacao(event);
    this.onListar(this.baseFilters);
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
