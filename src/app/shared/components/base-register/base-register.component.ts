import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-register',
  templateUrl: './base-register.component.html',
  styleUrls: ['./base-register.component.css']
})
export class BaseRegisterComponent extends BaseComponent implements OnInit {

  @Input() formulario: FormGroup;
  @Input() canSave: boolean = true;
  @Input() salving: boolean = true;
  @Input() canCancel: boolean = true;
  @Input() visible: boolean = true;
  @Output() eventEmiterBase = new EventEmitter();

  public base_editado: boolean = false;
  public base_canSave: boolean = false;
  public base_salvando: boolean = false;
  public base_processando: boolean = false;

  get canSaveBase() {
    return this.formulario.valid && this.canSave && this.base_editado && !this.base_processando;
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }
  
  public onSalvar(){
    this.eventEmiterBase.emit(this.canSave);
  }

  public onCancelar()
  {
    this.eventEmiterBase.emit(false);
  }

}
