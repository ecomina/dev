import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent extends BaseRegisterComponent implements OnInit {
  
  list_categorias: any[] = [];

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
 
  onComboChange(event: any, combo: any){
    this.formulario.get(combo)?.setValue(event.id);
  }

  get obs_categorias() : Observable<any[]> {
    return of(this.list_categorias);
  }

  get codigo_categoria_pai() {
    return this.formulario.value.codCategoriaECommercePai;
  }

  onCreateForm() {
    
    if (this.dataObj.data == null)
    {
      this.dataObj.data = {
        codigo: null,
        descricao: '',
        codCategoriaECommercePai: null,
        ativo: true
      }
    }

    this.formulario = this._builder.group({
      codigo: [this.dataObj.data.codigo], 
      descricao: [this.dataObj.data.descricao, Validators.required], 
      codCategoriaECommercePai: [this.dataObj.data.pai, Validators.required], 
      ativo: [this.dataObj.data.ativo, Validators.required] 
    }); 

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
      console.log(this.formulario.value)
    })  

    this.onCarregaCategorias();
  }

  onCarregaCategorias() {
    this.list_categorias = [];

    this._api.getCategoria(false).subscribe({
      next: result => {
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_categorias.push(item)
        }) 
      },
      error: erro => {
        console.error(erro)
      },
      complete: () => {
        console.log('complete', this.list_categorias, this.formulario.value)
      }
    })
  }

  onRegister(event: boolean) {

    if (event)
    {
      this.base_salvando = true;

      this._api.postCategoria(this.formulario.value).subscribe({
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
