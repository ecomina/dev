import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-produto-filtros',
  templateUrl: './produto-filtros.component.html',
  styleUrls: ['./produto-filtros.component.css']
})
export class ProdutoFiltrosComponent extends BaseComponent implements OnInit {

  @Input() set form(form: FormGroup) {
    this.formulario = form;
  }

  get filtrosControl() {
    return this.formulario.get('filtros') as FormArray;
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }
}
