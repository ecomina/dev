import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-produto-preco',
  templateUrl: './produto-preco.component.html',
  styleUrls: ['./produto-preco.component.css']
})
export class ProdutoPrecoComponent extends BaseComponent implements OnInit {

  @Input() set form(form: FormGroup) {
    this.formulario = form;
  }

  get precoControl() : FormGroup {
    return this.formulario.get('preco') as FormGroup;
  }

  get marketplacesControl() : FormArray {
    return this.precoControl.get('marketplaces') as FormArray;
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
