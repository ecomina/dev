import { Component, OnInit } from '@angular/core';
import { BaseListRegisterComponent } from '@app/shared/components/base-list-register/base-list-register.component';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent extends BaseListRegisterComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

  onFiltrar(f: any) {
   
  }

}
