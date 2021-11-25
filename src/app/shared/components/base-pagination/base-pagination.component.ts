import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasePaginacao } from '@app/modules/BasePaginacao';

@Component({
  selector: 'app-base-pagination',
  templateUrl: './base-pagination.component.html',
  styleUrls: ['./base-pagination.component.css']
})
export class BasePaginationComponent implements OnInit {

  _paginacao: BasePaginacao;
  @Input() set paginacao(paginacao: BasePaginacao) {
    this._paginacao = paginacao;
  }

  @Output() eventPaginar = new EventEmitter();

  get pagina() {
    return this._paginacao.Pagina;
  }

  get tamanhoDaPagina() {
    return this._paginacao.TamanhoDaPagina;
  }

  get totalPaginas() {
    return this._paginacao.TotalPaginas;
  }

  get temPaginaAnterior() {
    return this._paginacao.TemPaginaAnterior;
  }

  get temPaginaPosterior() {
    return this._paginacao.TemPaginaPosterior;
  }
  
  get exibir() : boolean {
    return (this.totalPaginas > 0);
  }

  constructor() { 
    this._paginacao = new BasePaginacao;
  }

  ngOnInit(): void {
  }

  onAnterior() {
    this._paginacao.Pagina--;
    this.eventPaginar.emit(JSON.stringify(this._paginacao));
  }

  onProxima() {
    this._paginacao.Pagina++;
    this.eventPaginar.emit(JSON.stringify(this._paginacao));
  }

  onItenPorPagina(total: number) {
    this._paginacao.Pagina = 1;
    this._paginacao.TamanhoDaPagina = total;
    this.eventPaginar.emit(JSON.stringify(this._paginacao));
  }

}
