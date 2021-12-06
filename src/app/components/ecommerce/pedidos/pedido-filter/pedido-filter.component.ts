import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { UtilsService } from '@app/core/services/utils.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BaseComponent } from '@app/shared/components/base/base.component';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';

export interface DialogData {
  filtrar: Boolean;
  filtros: BaseFilter[]}

@Component({
  selector: 'app-pedido-filter',
  templateUrl: './pedido-filter.component.html',
  styleUrls: ['./pedido-filter.component.css'],

})
export class PedidoFilterComponent extends BaseComponent implements OnInit {

  list_filter: BaseFilter[] = [];

  dataInicial = new FormControl(new Date(), Validators.required);
  dataFinal = new FormControl(new Date(), Validators.required)
  marketplace = new FormControl(null, Validators.required)
  status = new FormControl(null, Validators.required)

  list_marketplaces: any[] = []

  get marketplaces() {
    return this.list_marketplaces;
  }

  constructor(
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<PedidoFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _util: UtilsService,
    private dateAdapter: DateAdapter<Date>) {
      super();
      this.onCarregar();

    // this.dateAdapter.setLocale('pt-BR');
   }

  ngOnInit(): void {
  }

  onCarregar() {

    

    this.base_carregando = true;
    this._api.getMarketplace(false)
    .subscribe({
      next: result => {
        result.forEach(o => {
          this.list_marketplaces.push(o)})
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

  onAplicar() {

    this.list_filter.push({Param1: 'dataInicial', Param2: 'dataFinal', Value1: this.dataInicial.value, Value2:  this.dataFinal.value,
      Display: this._util.formataData(this.dataInicial.value)+' à '+this._util.formataData(this.dataInicial.value), Caption:'Periodo de Cadastro' });

    this.list_filter.push({Param1: 'marketplace', Param2: '', Value1: this.marketplace.value, Value2: null, Display: this.marketplace.value, Caption:'Marketplace'});
    this.list_filter.push({Param1: 'status',      Param2: '', Value1: this.status.value, Value2: null, Display: this.status.value, Caption:'Status'});

    this.data.filtrar = true;
    this.data.filtros = this.list_filter.filter(f => f.Value1 != null);


    this.dialogRef.close(this.data);
  }
}
