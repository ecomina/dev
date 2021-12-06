import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tamanho-edit',
  templateUrl: './tamanho-edit.component.html',
  styleUrls: ['./tamanho-edit.component.css']
})
export class TamanhoEditComponent extends BaseRegisterComponent implements OnInit {

  list_grades: any[] = [];
  id_value_grade: any;
  
  get obs_grades() : Observable<any[]> {
    return of(this.list_grades);
  }

  get id_combo_grade() {
    return this.formulario.value.codGradeEcommerce;
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
    this.onCarregaGrade();
  }

  onCreateForm() {

    if (this.dataObj.data == null)
    {
      this.dataObj.data = {
        codGradeEcommerce: null,
        codigo: null,
        descricao: '',
        ordem: 0,
        ativo: true
      }
    }

    this.formulario = this._builder.group({
      codGradeEcommerce: [this.dataObj.data.codGradeEcommerce, Validators.required],
      codigo: [this.dataObj.data.codigo], 
      descricao: [this.dataObj.data.descricao, [Validators.required, Validators.minLength(1)]], 
      ordem:  [this.dataObj.data.ordem, Validators.required], 
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

      this._api.postTamanho(this.formulario.value).subscribe({
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

  onCarregaGrade() {
    this.list_grades = [];

    this._api.getGrade().subscribe({
      next: result => {
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_grades.push(item)
        }) 
      },
      error: erro => {
        console.error(erro)
      },
      complete: () => {
        this.id_value_grade = this.list_grades[1].id;
      }
    })
  }

  onComboChange(event: any, combo: any){
    this.formulario.get(combo)?.setValue(event.id);
  }




}
