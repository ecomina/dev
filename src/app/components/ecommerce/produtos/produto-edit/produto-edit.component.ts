import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent extends BaseRegisterComponent implements OnInit {

  constructor(private _builder : FormBuilder) { 
    super();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formulario = this._builder.group({
     
    }) 
  }

  onRegister(event: any) {

  }

}
