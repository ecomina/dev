import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.css']
})
export class ProdutoItensComponent extends BaseComponent implements OnInit {

  @Input() set form(form: any) {
    this.formulario = form;
  }

  get cores(): FormArray {
    return this.formulario.get('cores') as FormArray
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
