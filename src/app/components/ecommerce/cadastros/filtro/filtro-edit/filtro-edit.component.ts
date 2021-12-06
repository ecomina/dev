import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { take } from 'rxjs/operators';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BaseListSelectComponent } from '@app/shared/components/base-list-select/base-list-select.component';
import { Observable, of } from 'rxjs';
import { DialogResult } from '@app/modules/BaseDialog';
import { Marketplace } from '@app/modules/Marketplace';
import { BaseViewItem } from '@app/modules/BaseViewItem';

@Component({
  selector: 'app-filtro-edit',
  templateUrl: './filtro-edit.component.html',
  styleUrls: ['./filtro-edit.component.css']
})
export class FiltroEditComponent extends BaseRegisterComponent implements OnInit {

  get salvando() {
    return this.base_salvando;
  }

  get marketplacesControl() : FormArray {
    return this.formulario.get('marketplaces') as FormArray;
  }

  get valoresControl() : FormArray {
    return this.formulario.get('valores') as FormArray;
  }

  get categoriasControl() : FormArray {
    return this.formulario.get('categorias') as FormArray;
  }

  get tipoFiltro() : any {
    return this.formulario.get('tipoFiltro')?.value;
  }

  get requerValor() : Boolean {
    const codigo = this.formulario.get('tipoFiltro')?.value;

    return [0, 1].includes(codigo);
  }

  public _categoriasView: BaseViewItem[] = [];
  get categoriasView() : Observable<BaseViewItem[]> {
    return of(this._categoriasView);
  }

  tiposFiltros: any[] = [
    { codigo: 0, descricao: 'Seleção Unica', requerValor: true },
    { codigo: 1, descricao: 'Seleção Multipla', requerValor: true},
    { codigo: 2, descricao: 'Texto', requerValor: false},
    { codigo: 3, descricao: 'Inteiro', requerValor: false},
    { codigo: 4, descricao: 'Decimal', requerValor: false},
    { codigo: 5, descricao: 'Não/Sim', requerValor: false}
  ];

  _listMarketplaces: Marketplace[] = [];

  get listMarketplaces()  {

    this._listMarketplaces.forEach((x, i) => {
      const mp = this.marketplacesControl.controls.find(element => element.value.codProvedorMarketplace === x.codigo);

      this._listMarketplaces[i].descricaoMarketplace = (mp != null) ? mp.value.descricaoMarketplace : this._listMarketplaces[i].descricaoMarketplace;
      this._listMarketplaces[i].idMarketplace = (mp != null) ? mp.value.idMarketplace : this._listMarketplaces[i].idMarketplace;

    })

    return this._listMarketplaces.filter(x => !x.permiteCadastrarFiltro)
  }

  constructor(
    private _builder: FormBuilder,
    private _api: EcommerceService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    public dialogMat: MatDialog
    ) {
      super();
      this.onCreateForm();
      this.baseMatDialog = dialogMat;
  }

  ngOnInit(): void {
    this.loadMarketPlaces();
 
    const codigo = this._activatedRoute.snapshot.paramMap.get('codigo');
    
    if (codigo != 'new')
      this.onLoad(codigo)
  }

  onChangeTipoFiltro() {
    let control = this.formulario.get('valorPadrao') as FormControl;

    control.setValue(null);
  }

  loadCategorias() {

    this.base_carregando = true;
    this._categoriasView = [];

    this._api.getCategoria()
    .pipe(
      take(1)
    )
    .subscribe({
      next: result => {

        let itens: BaseViewItem[] = [];
        result.forEach(c => {
          let item = new BaseViewItem();

          item.id = c.codigo
          item.idPai = c.codCategoriaECommercePai
          item.descricao = c.descricao
          item.selecionado = this.existCategoria(c.codigo)
          item.object = c

          itens.push(item)
          this._categoriasView.push(item)
        })

        this.base_carregando = false;
      }
    })
  }

  loadMarketPlaces() {
    this.base_carregando = true;
    this._api.getMarketplace(true)
      .pipe(
        take(1)
      )
      .subscribe({
        next: result => {
          result.forEach(o => {
            this._listMarketplaces.push(o)
          })

          this.base_carregando = false;
        }
      })
  }

  existCategoria(codCategoria: any) : boolean {

    const categorias = this.categoriasControl.controls.map(val => {
      return val.value})

      return categorias.includes(codCategoria);
  }

  onRelacionarFiltro(idx: number) {

    const marketplace = this._listMarketplaces[idx];

    const list$ = this.loadFiltroProvedorCategoria(marketplace.codigo)

    list$.subscribe(result => {
      const tipos$ = of(result);
      tipos$
      .subscribe(l => {
        this.selectList(idx, l)
      })
    })

  }

  onRelacionarValor(valor: any, idx: number) {
    const marketplace = this._listMarketplaces[idx];

    this.loadFiltroProvedorValor(valor, marketplace);
  }

  selectList(idx: number, list: any[]) {

    const marketplace = this._listMarketplaces[idx];

    //if (list.length > 0)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;

      dialogConfig.data = {
        confirmou: false,
        titulo: "Filtros Marketplace",
        list: list}

      const dialogRef = this.dialogMat.open(BaseListSelectComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result.confirmou)
        {

          const element: any = {
            descricaoProvedorMarketplace: marketplace.descricao,
            descricaoMarketplace: result.obj.descricao,
            codProvedorMarketplace: marketplace.codigo,
            idMarketplace: result.obj.id}

            this.removeValorMarketplace(marketplace);
            this.marketplacesControl.removeAt(this.marketplacesControl.value.findIndex((x:any) => x.codProvedorMarketplace === marketplace.codigo  ))
            this.marketplacesControl.push(this.buildMarketplace(element))
        }
      })
    }
  }

  selectListDetalhes(idx: number, list: any[]) {

    const marketplace = this._listMarketplaces[idx];

    //if (list.length > 0)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;

      dialogConfig.data = {
        confirmou: false,
        titulo: "Filtros Marketplace",
        list: list}

      const dialogRef = this.dialogMat.open(BaseListSelectComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result.confirmou)
        {

          const element: any = {
            descricaoProvedorMarketplace: marketplace.descricao,
            descricaoMarketplace: result.obj.descricao,
            codProvedorMarketplace: marketplace.codigo,
            idMarketplace: result.obj.id}

            this.marketplacesControl.removeAt(this.marketplacesControl.value.findIndex((x:any) => x.codProvedorMarketplace === marketplace.codigo  ))
            this.marketplacesControl.push(this.buildMarketplace(element))
        }
      })
    }
  }

  loadFiltroProvedorCategoria(codMarketplace: any) : Observable<any[]> {
    let list: any[] = [];
    const categorias: any[] = [];

    this.categoriasControl.controls.forEach(c => {
      categorias.push(c.value)
    })
    
    this._api.getFiltroProvedorCategorias(codMarketplace, categorias)
    .subscribe(result => {
        if (result != null)
        {
          result.forEach(o => {
            list.push({id: o.id, descricao: o.descricao, object: o, grupo: ''})
          })
        }
    })

    return of(list);
  }
  
  loadFiltroProvedorValor(valor: FormGroup, marketplace: any) : Observable<any[]> {

    let list: any[] = [];

    this._api.getFiltroProvedor(marketplace.codigo)
    .subscribe(result => {
      const filtros =  of(result.filter(x => x.id == marketplace.idMarketplace))

      filtros.subscribe(x => {
      if (x[0] != undefined)
      {
        const detalhes = of(x[0].detalhes)

        detalhes.subscribe((z: any[]) => {
           z.forEach(x => {
            list.push({id: x.id, descricao: x.valor, object: x, grupo: ''})
          })

          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;

          dialogConfig.data = {
            confirmou: false,
            titulo: "Filtros Valor",
            list: list}

          const dialogRef = this.dialogMat.open(BaseListSelectComponent, dialogConfig);

          dialogRef.afterClosed().subscribe(result => {
            if (result.confirmou)
            {
              this.removeValorDetalhe(valor, marketplace)
              this.addValorDetalhe(marketplace, valor, result.obj)
            }
          })
        })
      }
      })
    })

    return of(list);
  }

  removeValorDetalhe(valor: FormGroup, marketplace: any) {

    let formArray = valor.get('marketplaces') as FormArray;

    formArray.controls.forEach(x => {
      if (x.value.codProvedorMarketplace === marketplace.codigo) {
        formArray.removeAt(x.value)
      }
    })
  }

  removeValorMarketplace(marketplace: any) {

    let formArray = this.valoresControl.controls;
    formArray.forEach(valor => {

        let formMarketplaces = valor.get('marketplaces') as FormArray

        formMarketplaces.controls.forEach(x => {
          if (x.value.codProvedorMarketplace === marketplace.codigo) {
            x.value.idMarketplace = null;
            x.value.descricaoMarketplace = null;
          }
        })
    })
  }

  addValorDetalhe(marketplace: any, valor: FormGroup, object: any) {

    let formArray = valor.get('marketplaces') as FormArray;

    formArray.push(
      this.buildMarketplace({
        descricaoProvedorMarketplace: marketplace.descricaoProvedorMarketplace,
        descricaoMarketplace: object.descricao,
        codProvedorMarketplace: marketplace.codigo,
        idMarketplace: object.id
      })
    )
  }

  onCreateForm() {

    this.formulario = this._builder.group({
      codigo: null,
      descricao: ['', Validators.required],
      obrigatorio: false,
      tipoFiltro: [null, Validators.required],
      valorPadrao:[null], 
      ativo: true,
      valores: this._builder.array([]),
      marketplaces: this._builder.array([]),
      categorias: this._builder.array([])
    });

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
    })
  }

  buildForm(object: any) {

    this.novoCadastro = false;
    this.formulario.patchValue(object);

    this.formulario.get('valorPadrao')?.setValue('N');

    const marketplaces: any[] = object.marketplaces;
    marketplaces.forEach(element => {
      this.marketplacesControl.push(this.buildMarketplace(element))
    })

    const valores: any[] = object.valores;
    valores.forEach(element => {
      this.valoresControl.push(this.buildValores(element))
    })

    const categorias: any[] = (object.categorias == null) ? [] : object.categorias;
    categorias.forEach(element => {
      this.categoriasControl.push(new FormControl(element))
    })

    this.loadCategorias();
  }

  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.valoresControl.controls, event.previousIndex, event.currentIndex);
  }

  buildMarketplace(object: any) : FormGroup {
    return this._builder.group({
      descricaoProvedorMarketplace: object.descricaoProvedorMarketplace,
      descricaoMarketplace: object.descricaoMarketplace,
      codProvedorMarketplace: object.codProvedorMarketplace,
      idMarketplace: object.idMarketplace
    })
  }

  buildMarketplaces(objects: any[]) : FormArray {

    let formArray = this._builder.array([]);

    objects.forEach(element => {
      formArray.push(this.buildMarketplace(element))
    })

    return formArray;

  }

  buildValores(object: any) : FormGroup {
    return this._builder.group({
      codigo: [object.codigo],
      valor: [object.valor, Validators.required],
      ativo: [object.ativo, Validators.required],
      ordem: [object.ordem, Validators.required],
      marketplaces: this.buildMarketplaces(object.marketplaces)
    })
  }

  createValor() {

    let codigoMax = 0;

    if (this.valoresControl.controls.length > 0){
      codigoMax = this.valoresControl.controls.map(x => x.value.codigo).reduce(function(a, b) {
        return Math.max(a, b)
      })
    } 

    codigoMax++;
    return this._builder.group({
      codigo: [codigoMax],
      valor: [null, Validators.required],
      ativo: [true, Validators.required],
      ordem: [codigoMax, Validators.required],
      marketplaces: this._builder.array([]) //this.buildMarketplaces(object.marketplaces)
    })
  }

  onLoad(codigo: any) {
    this.base_carregando = true;

    this._api.getFiltroCodigo(codigo)
    .pipe(
        take(1)
    )
    .subscribe({
      next: result => {
        this.buildForm(result)
      },
      complete: () => {
        this.base_carregando = false;
      }
    })

  }

  getValorMarketplace(valor: any, codMarketplace: any) : any {

    let retorno = null;
    const list = of(valor.value.marketplaces);

    list.subscribe(result => {
      const valor = result.filter((x: any) => x.codProvedorMarketplace === codMarketplace.codigo)[0]//.descricaoMarketplace;

      if (valor != null)
        retorno = valor.descricaoMarketplace
    })

    return retorno;

  }

  onCategoriasChange(categorias: BaseViewItem[]) {

    this.categoriasControl.clear();

    categorias.forEach(c => {
      this.categoriasControl.push(new FormControl(c.id))
    })  
    
  }

  onAddValor() {
    this.valoresControl.push(this.createValor())

  }

  onDeleteValor(valor: any) {
    this.baseDialogConfirm('Remover este item?').afterClosed()
    .subscribe(result  => {
      if (result == DialogResult.OK)
          this.valoresControl.removeAt(valor);
   })
  }

  onRegister(event: boolean) {

     if (event)
    {

      if (this.requerValor && this.valoresControl.controls.length == 0) {
        this.baseDialogAlert('Lista de valores vazia', 'Informe ao menos um registro para lista de valores.');
      }
      else {

        if (!this.requerValor && this.valoresControl.controls.length > 0) 
        {
          this.valoresControl.setValue([]);
        }

        this.base_salvando = true;

        this._api.salvarFiltro(this.formulario.value, this.novoCadastro).subscribe({
          next: () => {
            this._location.back();
          },
          error: erro => {
            console.error(erro);
            this.base_salvando = false;
          }
        })
      }
    }
    else {
      this._location.back();
    }
  }

}
