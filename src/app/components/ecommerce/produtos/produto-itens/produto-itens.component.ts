import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.css']
})
export class ProdutoItensComponent extends BaseComponent implements OnInit {

  @Input() set form(form: any) {
    this.formulario = form;
  }

  list_cores: any[] = [];
  list_tamanhos: any[] = [];

  get obsCores() : Observable<any[]> {
    return of(this.list_cores)
  }

  get obsTamanhos() : Observable<any[]> {
    return of(this.list_tamanhos)
  }

  get coresControl(): FormArray {
    return this.formulario.get('cores') as FormArray
  }

  getChecked(cor: any): boolean {
    return true;
  }

  constructor(
    private _api: EcommerceService) { 
    super();
  }

  ngOnInit(): void {
    this.onListas()
  }

  onCorPrincipal(event: any) {
    this.coresControl.controls.forEach(x => {
      x.value.principal = false;
    })

    event.value.value.principal = true;
  }

  onListas() {
    this.onCores();
  }

  onCores() {
    this._api.getCor().subscribe({
      next: result => {
        this.base_carregando = true;
        result.forEach(o => {
          this.list_cores.push({id: o.codigo, descricao: o.codigo +' - '+ o.descricao, object: o, grupo: ''})
        })
      },
      error: erro => {
        alert('Erro ao carrega listas de cores');
      },
      complete: () => {
        this.onTamanhos();
      }
    })
  }

  onTamanhos() {
    this._api.getTamanho().subscribe({
      next: result => {
        this.base_carregando = true;
        result.forEach(o => {
          this.list_tamanhos.push({id: o.codigo, descricao: o.codigo +' - '+ o.descricao, object: o, grupo: ''})
        })
      },
      error: erro => {
        alert('Erro ao carrega listas de tamanhos');
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

  tamanhosControls(index: number) : FormArray {
    return this.coresControl.at(index).get('itens') as FormArray;
  }

  onChangeValue(event: any, control: AbstractControl, controlName: string) {
    control.get(controlName)?.setValue(event.id)
 }

 onChangeCor(event: any, control: any) {

  let corControl = control as FormGroup;
  const cor = corControl.get('cor') as FormGroup;
  cor.patchValue(event.object)
  console.log(cor.value, event)

 }

 onChangeTamanho(event: any, control: any) {

  let tamControl = control as FormGroup;
  const tam = tamControl.get('tamanho') as FormGroup;
  console.log(tam, event.object)
  tam.patchValue(event.object)
  console.log(tam.value, event)

 }

}
