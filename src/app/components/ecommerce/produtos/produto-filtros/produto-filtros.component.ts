import { compileDirectiveFromMetadata } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { take } from 'rxjs/operators';

export interface Filtro {
  codigo: number
  valores: FormArray
}

@Component({
  selector: 'app-produto-filtros',
  templateUrl: './produto-filtros.component.html',
  styleUrls: ['./produto-filtros.component.css']
})
export class ProdutoFiltrosComponent extends BaseComponent implements OnInit {

  @Input() set form(form: FormGroup) {
    this.formulario = form;
  }

  carregou_filtros = false;
  list_filtros: Filtro[] = [];

  get filtrosControl() {
    return this.formulario.get('filtros') as FormArray;
  }

  get codigoProduto() {
    return this.formulario.value.codigo;
  }

  constructor(
    private _api: EcommerceService,
    private _builder: FormBuilder) { 
    super();
  }

  ngOnInit(): void {

    this.filtrosControl.valueChanges
    .subscribe(x => {
      let filtro = x[x.length-1];
      if (filtro != undefined)
      this.onConsultar(filtro)
    })
  }

  onConsultar(filtro: any) {

    const codFiltro =  filtro.filtro.codigo;
    let valoresArray = filtro.valores as FormArray;

    if (valoresArray.length === 0 && codFiltro != null)
    {
      this._api.getProdutoFiltrosCodigo(this.codigoProduto, codFiltro)
      .pipe(
        take(1)
      )
      .subscribe({
        next: result => {
          const array = this.builderValores(result.valores);
          array.controls.forEach(c => {
           valoresArray.push(c.value)
          })
        }
      })
    }
  }

  builderValores(valores: any[]) {

    let formArray = this._builder.array([]);

    valores.forEach(x => {
      formArray.push(this._builder.group({
        codigo: x.codigo,
        valor: x.valor,
        ativo: x.ativo,
        ordem: x.ordem
      }))
    })

    return formArray;
  }

  onValor(event: any, filtro: any) {

    const detalhes = filtro.value.detalhesSelecionado as FormArray;

    filtro.value.detalhesSelecionado.length = 0;
    detalhes.push(event.value);
  }

  compareFunction(o1: any, o2: any) : boolean{
    return true;// (o1.codigo == o2.codigo && o1.valor == o2.valor);
   }

  onRequerValor(filtro: any) : Boolean {
    const codigo = filtro.value.filtro.tipoFiltro;

    return [0, 1].includes(codigo);
  }

  getValores(codFiltro: any) : any[] {

    const filtros = this.filtrosControl.controls.filter(x => x.value.filtro.codigo === codFiltro);

    return filtros[0].value.filtro.valores;
  }

  getValores2(codFiltro: any) : FormArray {

    const filtros = this.list_filtros.filter(x => x.codigo === codFiltro)
    
    if (filtros.length > 0)
      return filtros[0].valores
    else
      return this._builder.array([])
  }

  getValoresControl(filtro: any) : FormControl {

    let ctrl = new FormControl();

    if (filtro.value.detalhesSelecionado.length > 0) {

      const valores = filtro.value.detalhesSelecionado.map((x: any) => {
        return x
      });

    if (filtro.value.filtro.tipoFiltro === 0)
      ctrl.setValue([])
    else
      ctrl.setValue(valores)
    }

    return ctrl;

  }

}
