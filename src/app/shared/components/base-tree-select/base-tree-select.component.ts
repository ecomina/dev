import { Component, DoCheck, EventEmitter, Input, IterableDiffers, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseTreeSelect } from '@app/modules/BaseTreeSelect';
import { BaseViewItem } from '@app/modules/BaseViewItem';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-base-tree-select',
  templateUrl: './base-tree-select.component.html',
  styleUrls: ['./base-tree-select.component.css']
})
export class BaseTreeSelectComponent implements OnInit, DoCheck {

  @Input() autoExpandir: boolean = false;
  @Input() loadFilhos: boolean = true;

  private _tipo: string = 'option';
  @Input() set tipo(tipo: string) {
    this._tipo = tipo;
  }

  private _pais: BaseTreeSelect[] = [];
  @Input() set pais(pais: BaseTreeSelect[]) {
    this._pais = pais;
  }

  private _baseViews: BaseViewItem[] = [];
  private differ: IterableDiffers;

  @Input() set baseViews(value: BaseViewItem[]) {
    this._baseViews = value;

    // console.log(value)
    // if (value.length > 0) {
    //   console.log(value.length )
    //   this.onCarregarListaPais();
    // }
  }

  @Input() callbackFunction: (args: any) => void;

  private _sequencial: number = 0;
  @Input() set sequencial(sequencial: number) {
    this._sequencial = sequencial;
  }

  @Output() eventSelected = new EventEmitter();
  @Output() eventDelete = new EventEmitter();
  @Output() eventEdit = new EventEmitter();
  @Output() eventAdd = new EventEmitter();
  @Output() eventCarregarFilhos = new EventEmitter();

  get tipo() : string {
    return this._tipo;
  }

  get tipoOption() : boolean {
    return (this._tipo == 'option');
  }

  get tipoCheck() : boolean {
    return (this._tipo == 'check');
  }

  get tipoRadion() : boolean {
    return (this._tipo == 'radion' && !this.loadFilhos);
  }

  get pais() {
    return this._pais;
  }

  get selecionados() {
    return this._pais;
  }

  get canView() {
    return (this._pais.length > 0)
  }

  constructor(private differs: IterableDiffers) { 
    this.differ = differs
  }

  ngDoCheck() {
    const changes = this.differ.find(this._baseViews);
    if (changes && this.pais.length == 0) {
      this.onCarregarListaPais();
    }
  }

  ngOnInit(): void {
  }

  onBaseViwes() {
    console.log('onBaseViwes', this._baseViews)
  }

  onCarregarListaPais() {

    this._baseViews.filter(x => x.idPai == '').forEach(p => {
    
      let pai = new BaseTreeSelect({
        codigo: p.id,
        descricao: p.descricao,
        selecionado: false,
        objValue: p.object,
        filhos: this.onCarregarListaFilhos(p)
      })

      this.pais.push(pai)
    })

  }

  onCarregarListaFilhos(pai: BaseViewItem) : BaseTreeSelect[] {

    let filhos: BaseTreeSelect[] = [];

    this._baseViews.filter(x => x.idPai == pai.id).forEach(f => {
      const filho = new BaseTreeSelect({
        codigo: f.id,
        descricao: f.descricao,
        selecionado: f.selecionado,
        objValue: f.object,
        filhos: this.onCarregarListaFilhos(f),
      })

      filhos.push(filho);
    })

    return filhos;
  }

  onClass(index: number) {
    return (index / 2 == 0) ? 'tree-pai par' : 'tree-pai';
  }

  canExpandir(pai: BaseTreeSelect) : boolean {
    return (pai.expandir === true) || this.autoExpandir;
  }

  viewExpandir(pai: BaseTreeSelect) {
    return (pai.filhos.length > 0)
  }

  onSelectedClick(pai: BaseTreeSelect) {
    if (this.loadFilhos && pai.filhos.length == 0)
    {
      this.eventCarregarFilhos.emit(pai);
    }
    else 
    {
      pai.expandir = !pai.expandir;

      if (this.tipoOption) {
        this.onSelected(pai)
      }
    }
  }

  onSelected(item: BaseTreeSelect) 
  {
    this.eventSelected.emit(item)
  }

  onSelectedCheck(event: any, pai: BaseTreeSelect) {
    pai.selecionado = event.checked

    pai.filhos.forEach(x => {
      x.selecionado = pai.selecionado
    })

    this.eventSelected.emit(pai)
  }

  onCarregarFilhos(pai: BaseTreeSelect) {
   // pai.carregando = true;
    this.eventCarregarFilhos.emit(pai)
  }

  onAdd(item: any) {
    this.eventAdd.emit(item);
  }

  onEdit(item: any) {
    this.eventEdit.emit(item);
  }

  onDelete(item: any) {
    this.eventDelete.emit(item);
  }


}
