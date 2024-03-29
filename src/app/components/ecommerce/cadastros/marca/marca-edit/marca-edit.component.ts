import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';

@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrls: ['./marca-edit.component.css']
})
export class MarcaEditComponent extends BaseRegisterComponent implements OnInit {

  get salvando() {
    return this.base_salvando;
  }

  constructor(
    private _builder: FormBuilder,
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<BaseRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public dataObj: any) { 
      super();
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
        ativo: true
      }
    }

    this.formulario = this._builder.group({
      codigo: [this.dataObj.data.codigo], 
      descricao: [this.dataObj.data.descricao, Validators.required], 
      ativo: [this.dataObj.data.ativo, Validators.required] 
    }); 

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
    })  
  }

  onRegister(event: boolean) {

    if (event)
    {
      this.base_salvando = true;

      this._api.postMarca(this.formulario.value).subscribe({
        next: result => {
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
