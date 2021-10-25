import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido-filter',
  templateUrl: './pedido-filter.component.html',
  styleUrls: ['./pedido-filter.component.css'],

})
export class PedidoFilterComponent implements OnInit {

  list_filter: BaseFilter[] = [];

  dataInicial = new FormControl(moment());
  dataFinal = new FormControl(moment())
  list_marketplaces: any[] = []

  get marketplaces() {
    return this.list_marketplaces;
  }

  constructor(
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<PedidoFilterComponent>,
    private dateAdapter: DateAdapter<Date>) {
      this.onCarregar();

    // this.dateAdapter.setLocale('pt-BR');
   }

  ngOnInit(): void {
  }

  onCarregar() {
    this._api.getMarketplace(false)
    .subscribe(result => {
      result.forEach(o => {
        this.list_marketplaces.push(o)
      })
    })
  }

  onAplicar() {

    for (let i=0; i < 10; i++)
      this.list_filter.push({
        Name: 'Name',
        Caption: '',
        Value1: 0,
        Value2: 0
      })

    this.dialogRef.close(this.list_filter);
  }

}
