import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';

@Component({
  selector: 'app-dimensao-edit',
  templateUrl: './dimensao-edit.component.html',
  styleUrls: ['./dimensao-edit.component.css']
})
export class DimensaoEditComponent extends BaseRegisterComponent implements OnInit {

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
        ativo: true,
        dimensaoProduto: {
          peso: 0,
          altura: 0,
          largura: 0,
          profundidade: 0
        },
        dimensaoEmbalagem: {
          peso: 0,
          altura: 0,
          largura: 0,
          profundidade: 0
        }
      }
    }

    this.formulario = this._builder.group({
      codigo: [this.dataObj.data.codigo], 
      descricao: [this.dataObj.data.descricao, Validators.required], 
      dimensaoProduto: this._builder.group({
        peso: [this.dataObj.data.dimensaoProduto.peso, Validators.required], 
        altura: [this.dataObj.data.dimensaoProduto.altura, Validators.required], 
        largura: [this.dataObj.data.dimensaoProduto.largura, Validators.required], 
        profundidade: [this.dataObj.data.dimensaoProduto.profundidade, Validators.required]
      }),
      dimensaoEmbalagem: this._builder.group({
        peso: [this.dataObj.data.dimensaoEmbalagem.peso, Validators.required], 
        altura: [this.dataObj.data.dimensaoEmbalagem.altura, Validators.required], 
        largura: [this.dataObj.data.dimensaoEmbalagem.largura, Validators.required], 
        profundidade: [this.dataObj.data.dimensaoEmbalagem.profundidade, Validators.required]
      })
    }); 

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
    })  
  }

  onRegister(event: boolean) {

    if (event)
    {
      this.base_salvando = true;

      this._api.postDimensao(this.formulario.value).subscribe({
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
