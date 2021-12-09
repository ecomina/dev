import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-pedido-itens',
  templateUrl: './pedido-itens.component.html',
  styleUrls: ['./pedido-itens.component.css']
})
export class PedidoItensComponent extends BaseComponent implements OnInit {

  @Input() set form(form: any) {
    this.formulario = form;
  }

  get itensControl() : FormArray {
    return this.formulario.get('itens') as FormArray;
  }

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

  onItem(item: any) {
    console.log(item)
  }

}
