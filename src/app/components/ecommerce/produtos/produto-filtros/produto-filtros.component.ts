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

  }

  onConsultar() {

    if (!this.carregou_filtros ) {
      if (this.list_filtros.length == 0)
      {
        this.carregou_filtros = true;
        this._api.getProdutoFiltros(this.codigoProduto)
        .pipe(
          take(1)
        )
        .subscribe({
          next: result => {
            result.forEach(x => {
              this.list_filtros.push({
                codigo: x.codigo,
                valores: this.builderValores(x.valores)
              })              
            })
          }
        })
      }
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

    const options: any[] = event.value;
    const valores: any[] = filtro.value.filtro.detalhesSelecionado;

    filtro.value.filtro.detalhesSelecionado.length = 0;

    let retorno: Filtro[] = this.list_filtros.filter(x => x.codigo === filtro.value.filtro.codigo);

    retorno.forEach(x => {
      x.valores.controls.forEach((f, i) => {
        if (options.includes(f.value.valor)) {
          console.log('achou')
          filtro.value.filtro.detalhesSelecionado.push({
            codigo: i,
            valor: f.value.valor,
            ativo: f.value.ativo,
            ordem: i
          })
        }
      })
    })

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

    if (filtro.value.filtro.detalhesSelecionado.length > 0) {

      const valores = filtro.value.filtro.detalhesSelecionado.map((x: any) => {
        return x.valor
      });

    if (filtro.value.filtro.tipoFiltro === 0)
      ctrl.setValue([])
    else
      ctrl.setValue(valores)
    }

    return ctrl;

  }

}
