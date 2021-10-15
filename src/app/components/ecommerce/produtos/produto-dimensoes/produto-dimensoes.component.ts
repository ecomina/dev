import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseListSelectComponent } from '@app/shared/components/base-list-select/base-list-select.component';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-produto-dimensoes',
  templateUrl: './produto-dimensoes.component.html',
  styleUrls: ['./produto-dimensoes.component.css']
})
export class ProdutoDimensoesComponent extends BaseComponent implements OnInit {

  @Input() set form(form: any) {
    this.formulario = form;
  } 

  public formularioPai: FormGroup;

  list_dimensoes: any[] = [];
  
  get obs_dimensoes() : Observable<any[]> {
    return of(this.list_dimensoes)
  }

  get formDimensao() : any {
    return this.formulario.get('dimensao');
  }

  constructor(
    private _builder: FormBuilder,
    private _api: EcommerceService,
    public dialog: MatDialog) { 
      super();
      this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {

    this.formulario = this._builder.group({
      dimensaoProduto: this._builder.group({
        peso:0,
        altura: 0,
        largura: 0,
        profundidade: 0
      }),
      dimensaoEmbalagem: this._builder.group({
        peso:0,
        altura: 0,
        largura: 0,
        profundidade: 0
      })          
    })

    this.formulario.valueChanges.subscribe(value => {
      console.log('Formulario Dimensão Alterado', this.formularioPai)
      this.formularioPai.get('dimensao')?.patchValue(this.formulario.value)

    })  

    this.onListDimensoes();
  }

  onListDimensoes() {
    this._api.getDimensao().subscribe({
      next: result => {
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_dimensoes.push(item)
        })
      }
    })
  }

  onComboChange(event: any, combo: any) {
    //this.formulario.get(combo)?.setValue(event.id);
  }

  onDimensoes() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      confirmou: false,
      titulo: "Dimensões Pré-definidas",
      list: this.list_dimensoes}

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(BaseListSelectComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmou)
      {
        this.formDimensao.get('dimensaoProduto')?.patchValue(result.obj.object.dimensaoProduto);
        this.formDimensao.get('dimensaoEmbalagem')?.patchValue(result.obj.object.dimensaoEmbalagem);
      }
    })

  }
}
