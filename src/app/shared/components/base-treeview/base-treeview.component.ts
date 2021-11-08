import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseViewItem } from '@app/modules/BaseViewItem';
import { TreeviewItem } from 'ngx-treeview';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-base-treeview',
  templateUrl: './base-treeview.component.html',
  styleUrls: ['./base-treeview.component.css']
})
export class BaseTreeviewComponent implements OnInit {

  @Input() titulo = '';
  @Input() canFilter = false;

  private _itens: BaseViewItem[] = [];
  @Input() public set itens(its: BaseViewItem[]) {
    this._itens = its;
    //this.montarPais();
  }

  @Input() public set obsItens(its: Observable<BaseViewItem[]>) {
    
    its.subscribe({
      next: result => {
        this._itens = result;
        if (this._itens.length > 0 && this._list.length == 0)
          this.montarPais();
      }
    })
  }

  @Output() eventSelectedChange = new EventEmitter();
  @Output() eventFilterChange = new EventEmitter();

  config = {
    hasAllCheckBox: true,
    hasFilter: this.canFilter,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: false
 }
 
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];

  buttonClass = this.buttonClasses[0];
  _list: any[] = [];

  get list() {
    return this._list;
  }

  constructor() { }

  ngOnInit(): void {
  }

  montarPais() {

    this._itens.filter(x => x.idPai == null).forEach(p => {
      const pai = new TreeviewItem({
        text: p.id+' '+p.descricao,
        value: p.id,
        checked: p.selecionado,
        children: this.montarFilhos(p)
      })

      this._list.push(pai)
    })
  }

  montarFilhos(pai: BaseViewItem) : TreeviewItem[] {

    let filhos: TreeviewItem[] = [];

    this._itens.filter(x => x.idPai == pai.id).forEach(f => {
      const filho = new TreeviewItem({
        text: f.id+' '+f.descricao,
        value: f.id,
        checked: f.selecionado,
        children: this.montarFilhos(f),
      })

      filhos.push(filho);
    })

    return filhos;
  }

  onSelectedChange(event: any[]) {
    if (event != undefined)
    {
      const list = this._itens.filter(x => event.includes(x.id))
      this.eventSelectedChange.emit(list);
    }
  }

  onFilterChange(event: any) {
  }

}
