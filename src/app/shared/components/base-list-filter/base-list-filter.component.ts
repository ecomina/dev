import { APP_INITIALIZER, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { initializerFn } from '@app/app-routing.module';
import { PedidoFilterComponent } from '@app/components/ecommerce/pedidos/pedido-filter/pedido-filter.component';
import { AppConfigurarionJsonService } from '@app/_config/app-configuration-json-service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-list-filter',
  templateUrl: './base-list-filter.component.html',
  styleUrls: ['./base-list-filter.component.css'],

})

export class BaseListFilterComponent extends BaseComponent implements OnInit {

  @Input() canFilter = false;

  @Output() eventFilter = new EventEmitter();

  public base_list: any[] = [];
  txt_pesquisa = '';

  get can_clear(): boolean {
    return (this.txt_pesquisa.length > 0);
  }

  public constructDialog<T>(TCtor: new (...args: any[]) => T,data: any): MatDialogRef<T,any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.matDialog.open(TCtor, dialogConfig);
    return dialogRef;
 }

  constructor(
    public matDialog: MatDialog
  ) { 
    super()
  }

  ngOnInit(): void {
  }

  onClear() {
    this.txt_pesquisa = '';
    this.eventFilter.emit(this.txt_pesquisa);
  }

  onFilterShow() {

    this.eventFilter.emit(true);
    // const dialogRef =  this.constructDialog(PedidoFilterComponent, {
    //   data: {
    //     msg: ''
    //   }
    // })
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.data = {
    //   data: null};

    // dialogConfig.disableClose = false;      

    // const dialogRef = this.matDialog.open(BaseListFilterComponent, dialogConfig)

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result)
    // })
  }

  onFilterList() {
    this.eventFilter.emit(this.txt_pesquisa);
  }  

}
