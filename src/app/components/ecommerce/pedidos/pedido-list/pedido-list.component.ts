import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseListFilterComponent } from '@app/shared/components/base-list-filter/base-list-filter.component';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';
import { PedidoFilterComponent } from '../pedido-filter/pedido-filter.component';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent extends BaseListFilterComponent implements OnInit {

  constructor(public matDialog: MatDialog) { 
    super(matDialog);
  }

  ngOnInit(): void {
  }

  onFiltrar(f: any) {
    const dialogRef =  this.constructDialog(PedidoFilterComponent, {
      data: {
        msg: ''
      }
    })

        dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })

  }



}
