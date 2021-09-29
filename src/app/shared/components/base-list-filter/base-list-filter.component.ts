import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-list-filter',
  templateUrl: './base-list-filter.component.html',
  styleUrls: ['./base-list-filter.component.css']
})
export class BaseListFilterComponent implements OnInit {

  @Output() eventFilter = new EventEmitter();

  txt_pesquisa = '';

  get can_clear(): boolean {
    return (this.txt_pesquisa.length > 0);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    this.txt_pesquisa = '';
    this.eventFilter.emit(this.txt_pesquisa);
  }

  onPesquisa() {
    this.eventFilter.emit(this.txt_pesquisa);
  }  

}
