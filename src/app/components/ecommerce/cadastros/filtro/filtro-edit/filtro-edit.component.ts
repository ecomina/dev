import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';

@Component({
  selector: 'app-filtro-edit',
  templateUrl: './filtro-edit.component.html',
  styleUrls: ['./filtro-edit.component.css']
})
export class FiltroEditComponent extends BaseRegisterComponent implements OnInit {

  get salvando() {
    return this.base_salvando;
  }

  constructor(
    private _builder: FormBuilder,
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<BaseRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public dataObj: any) { 
      super();
      console.log(dataObj)
  }

  ngOnInit(): void {
    this.onCreateForm();  
  }

  onCreateForm() {
    
    if (this.dataObj.data == null)
    {
      this.dataObj.data = {
        codigo: null,
        descricao: '',
        ativo: true,
        obrigatorio: false,
        suportaItens: false
      }
    }

    this.formulario = this._builder.group({
      codigo: [this.dataObj.data.codigo], 
      descricao: [this.dataObj.data.descricao, Validators.required], 
      ativo: [this.dataObj.data.ativo, Validators.required],
      obrigatorio: [this.dataObj.data.obrigatorio, Validators.required],
      suportaItens: [this.dataObj.data.suportaItens, Validators.required] 
    }); 

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
    })  
  }

  onRegister(event: boolean) {

    if (event)
    {
      this.base_salvando = true;

      this._api.postFiltro(this.formulario.value).subscribe({
        next: () => {
          this.dataObj.confirmou = event;
          this.dataObj.data = this.formulario.value;
        },
        error: erro => {
          console.error(erro);
          this.base_salvando = false;
          this.dialogRef.close(this.dataObj);
        },
        complete: () => {
          this.base_salvando = false;
          this.dialogRef.close(this.dataObj)
        }
      })
    }
    else {
      this.dialogRef.close()
    }
  }

}
