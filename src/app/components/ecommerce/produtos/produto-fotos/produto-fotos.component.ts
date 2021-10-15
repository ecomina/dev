import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-produto-fotos',
  templateUrl: './produto-fotos.component.html',
  styleUrls: ['./produto-fotos.component.css']
})
export class ProdutoFotosComponent extends BaseComponent implements OnInit {

  @Input() set form(form: any) {
    this.formulario = form;
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
