import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-cores-edit',
  templateUrl: './cores-edit.component.html',
  styleUrls: ['./cores-edit.component.css']
})
export class CoresEditComponent extends BaseRegisterComponent implements OnInit {

  get getCanSave() {
    return this.base_editado && this.canSave
  }

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

      this._api.postCor(this.formulario.value).subscribe({
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
