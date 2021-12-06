import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseCombo } from '@app/modules/BaseCombo';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-filtro-marketplace',
  templateUrl: './filtro-marketplace.component.html',
  styleUrls: ['./filtro-marketplace.component.css']
})
export class FiltroMarketplaceComponent extends BaseComponent implements OnInit {

  listTipos: BaseCombo[] = [];
  listDetalhes: any[] = [];
  tipoSelecionado: any;

  get obsTiposMarketplace() {
    return of(this.listTipos)
  }

  get detalhes() {
    return this.listDetalhes;
  }

  constructor(
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<FiltroMarketplaceComponent>) { 
      super();
    }

  ngOnInit(): void {
    this.loadFiltrosProvedor(1);
  }

  loadFiltrosProvedor(codMarketplace: any) {
    this._api.getFiltroProvedor(codMarketplace)
    .subscribe(result => {
        result.forEach(o => {
          this.listTipos.push({id: o.id, descricao: o.descricao, object: o, grupo: ''})
        })
    })
  }

  onTipoSelecionado(event: any) {
    this.dialogRef.close(event)
  }

}
