import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { UtilsService } from '@app/core/services/utils.service';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Observable, of } from 'rxjs';

export interface DialogData {
  filtrar: Boolean;
  filtros: BaseFilter[]}

@Component({
  selector: 'app-produto-filter',
  templateUrl: './produto-filter.component.html',
  styleUrls: ['./produto-filter.component.css']
})
export class ProdutoFilterComponent extends BaseComponent implements OnInit {

  list_filter: BaseFilter[] = [];

  dataCadastroInicial = new FormControl(null);
  dataCadastroFinal = new FormControl(null)
  somenteAtivosControl = new FormControl(false)
  codigoControl = new FormControl(null)
  codigoLegadoControl = new FormControl(null)
  marcaControl = new FormControl(null)
  categoriaControl = new FormControl(null)
  descricaoControl = new FormControl(null)
  modeloControl = new FormControl(null)

  marketplace = new FormControl(null)
  status = new FormControl(null)

  list_marketplaces: any[] = []
  private list_marcas: any[] = [];
  private list_categorias: any[] = [];

  get marketplaces() {
    return this.list_marketplaces;
  }

  get obs_marcas() : Observable<any[]> {
    return of(this.list_marcas);
  }

  get obs_categorias() : Observable<any[]> {
    return of(this.list_categorias);
  }

  constructor(
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<ProdutoFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _util: UtilsService,
    private dateAdapter: DateAdapter<Date>) {
      super();
      this.onCarregar();

    // this.dateAdapter.setLocale('pt-BR');
   }

  ngOnInit(): void {
    this.onCarregaMarcas();
    this.onCarregaCategorias();
  }

  onCarregaMarcas() {
    this._api.getMarca().subscribe({
      next: result => {
        this.base_carregando = true;
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_marcas.push(item);
        })
      },
      error: erro => {
        this.base_carregando = false;
        alert(erro);
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

  onCarregaCategorias() {
    this._api.getCategoria().subscribe({
      next: result => {
        this.base_carregando = true;
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_categorias.push(item);
        })
      },
      error: erro => {
        this.base_carregando = false;
        alert(erro)
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

  onCarregar() {
    const f = this.data;
    console.log('onCarregar', f.filtrar);
  }

  onAplicar() {

    this.list_filter.push({
      Param1: 'dataCadastroInicial', 
      Param2: 'dataCadastroFinal', 
      Value1:  (this.dataCadastroInicial.value == null) ? null : this._util.dataParam(this.dataCadastroInicial.value),
      Value2:  (this.dataCadastroFinal.value == null) ? null : this._util.dataParam(this.dataCadastroFinal.value),
      Display: this._util.formataData(this.dataCadastroInicial.value)+' à '+this._util.formataData(this.dataCadastroFinal.value), 
      Caption:'Periodo de Cadastro' });

   this.list_filter.push({
     Param1: 'codigo',
     Param2: '',
     Value1: this.codigoControl.value,
     Value2: null,
     Display: this.codigoControl.value,
     Caption: 'Código'
   })

   this.list_filter.push({
    Param1: 'codigoLegado',
    Param2: '',
    Value1: this.codigoLegadoControl.value,
    Value2: null,
    Display: this.codigoLegadoControl.value,
    Caption: 'Código Legado'
  })

  this.list_filter.push({
    Param1: 'descricao',
    Param2: '',
    Value1: this.descricaoControl.value,
    Value2: null,
    Display: this.descricaoControl.value,
    Caption: 'Descrição'
  })

  this.list_filter.push({
    Param1: 'modelo',
    Param2: '',
    Value1: this.modeloControl.value,
    Value2: null,
    Display: this.modeloControl.value,
    Caption: 'Modelo'
  })

  this.list_filter.push({
    Param1: 'somenteAtivos',
    Param2: '',
    Value1: this.somenteAtivosControl.value,
    Value2: null,
    Display: (this.somenteAtivosControl.value) ? 'Sim' : 'Não',
    Caption: 'Somente Ativos'
  })

  if (this.marcaControl.value != null)
  {  
    this.list_filter.push({
      Param1: 'codMarca',
      Param2: '',
      Value1: this.marcaControl.value.id,
      Value2: null,
      Display: this.marcaControl.value.descricao,
      Caption: 'Marca'})
  }

  if (this.categoriaControl.value != null)
  {
    this.list_filter.push({
      Param1: 'codCategoria',
      Param2: '',
      Value1: this.categoriaControl.value.id,
      Value2: null,
      Display: this.categoriaControl.value.descricao,
      Caption: 'Categoria'
    })
  }

  this.data.filtrar = true;
  this.data.filtros = this.list_filter.filter(f => f.Value1 != null);

  this.dialogRef.close(this.data);
  }

  onMarcaChange(event: any) {
    this.marcaControl.setValue(event);
    console.log(this.marcaControl)
  }

  onCategoriaChange(event: any) {
    this.categoriaControl.setValue(event);
    console.log(this.categoriaControl)
  }


}
