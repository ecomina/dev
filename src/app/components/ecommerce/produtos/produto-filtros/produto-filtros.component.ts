import { compileDirectiveFromMetadata } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { of } from 'rxjs';
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

  controle = new FormControl();

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

  compareFn(c1: any, c2: any) {
    console.log('compareFn', c1, c2)
    return true;//c1 && c2 ? c1.codigo === c2.codigo : c1 === c2;
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

  onValorChange(event: any, filtro: any) {

    const selecionados: any[] = event.value;

    const valores = of(filtro.value.valores.filter((x: any) => selecionados.includes(x.valor)))

    valores.subscribe(v => {
      let detalhes = filtro.value.detalhesSelecionado as FormArray;
      filtro.value.detalhesSelecionado.length = 0;

      v.forEach((x: any) => {
        detalhes.push(x)
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

  onDetalhesSelecionados(detalhes: any, multiplo: boolean) {

    const control = new FormControl();

    if (detalhes.value.detalhesSelecionado.length > 0)
    {
      const selecionados: any[] = detalhes.value.detalhesSelecionado;

      const itens =  selecionados.map(x => x.valor);

      if (multiplo)
        control.setValue(itens);
      else
        control.setValue(itens[0]);
    }
    
    return control;
  }

  controlSelecionados(detalhes: any[], mutiplo: boolean) : FormControl {
    let control = new FormControl();
    let itens: string[] = [];

    of(detalhes).subscribe(x => {
      x.forEach(detalhe => {
        if (mutiplo)
          itens.push(detalhe.valor)
        else
          control.setValue(detalhe.valor)

      })
      
      if (mutiplo)
        control.setValue(itens)
    })

    return control;
  }
}
