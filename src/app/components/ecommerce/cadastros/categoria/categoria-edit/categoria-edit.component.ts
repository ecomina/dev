import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Marketplace } from '@app/modules/Marketplace';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoriaMarketplaceComponent } from '../categoria-marketplace/categoria-marketplace.component';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent extends BaseRegisterComponent implements OnInit {
  
  _list_categorias: any[] = [];
  _listMarketplaces: Marketplace[] = [];

  get salvando() {
    return this.base_salvando;
  }

  get listMarketplaces() {

    this._listMarketplaces.forEach((x, i) => {
      const mp = this.marketplacesControl.controls.find(control => control.value.codProvedorMarketplace === x.codigo);

      this._listMarketplaces[i].descricaoMarketplace = (mp != null) ? mp.value.descricaoMarketplace : this._listMarketplaces[i].descricaoMarketplace;
      this._listMarketplaces[i].idMarketplace = (mp != null) ? mp.value.idMarketplace : this._listMarketplaces[i].idMarketplace;
    })
     
    return this._listMarketplaces.filter(x => !x.permiteCadastrarCategoria)
  }

  get marketplacesControl() : FormArray {
    return this.formulario.get('marketplaces') as FormArray;
  }

  get obs_categorias() : Observable<any[]> {
    return of(this._list_categorias);
  }

  get codigo_categoria_pai() {
    return this.formulario.value.codCategoriaECommercePai;
  }

  constructor(
    private _builder: FormBuilder,
    private _location: Location,
    private _api: EcommerceService,
    private _activatedRoute: ActivatedRoute,
    public matDialog: MatDialog) { 
      super();
      this.onCreateForm();  
  }

  ngOnInit(): void {
    this.onLoad();
    this.loadMarketPlaces();
  }

  onLoad() {
    const codigo = this._activatedRoute.snapshot.paramMap.get('codigo');
    const codigoPai = this._activatedRoute.snapshot.paramMap.get('codigoPai');
    
    if (codigo != null) {
      this.novoCadastro = true;
      this._api.getCategoriaCodigo(codigo)
        .pipe(
          take(1)
        )
        .subscribe({
          next: result => {
            this.buildForm(result);
          }
        }) 
    }
    else {
      let control = this.formulario.get('codCategoriaECommercePai') as FormControl;
      control.setValue(codigoPai)
    }
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

  onComboChange(event: any, combo: any) {

    if (event == null)
      this.formulario.get(combo)?.setValue(null);
    else
      this.formulario.get(combo)?.setValue(event.id);
  }

  onRelacionar(marketplace: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    const dialogRef = this.matDialog.open(CategoriaMarketplaceComponent, dialogConfig);

    dialogRef.afterClosed()
    .subscribe(result => {

      if (result != null)
      {
        this.onCreateMarketplace(marketplace, result)
      }
    }) 
  }

  onCreateMarketplace(marketplace: any, categoria: any) {

    this.marketplacesControl.controls.forEach((x: any) => {
      if (x.value.codProvedorMarketplace === marketplace.codigo)
        this.marketplacesControl.removeAt(x)
    }) 

    const control = 
      this.buildMarketplace({
        descricaoProvedorMarketplace: marketplace.descricao,
        descricaoMarketplace: categoria.descricao,
        codProvedorMarketplace: marketplace.codigo,
        idMarketplace: categoria.id});

    this.marketplacesControl.push(control);
  }

  onCreateForm() {
    
    this.formulario = this._builder.group({
      codigo: [null], 
      descricao: ['', Validators.required], 
      codCategoriaECommercePai: [null], 
      ativo: [true, Validators.required],
      marketplaces: this._builder.array([])
    }); 

    this.formulario.valueChanges.subscribe(value => {
      this.base_editado = true;
    })  

    this.onCarregaCategorias();
  }

  buildForm(object: any) {
    this.formulario.patchValue(object);

    object.marketplaces.forEach((m:any) => {
      this.marketplacesControl.push(this.buildMarketplace(m));
    })
  }

  buildMarketplace(object: any) : FormGroup {
    return this._builder.group({
      descricaoProvedorMarketplace: object.descricaoProvedorMarketplace,
      descricaoMarketplace: object.descricaoMarketplace,
      codProvedorMarketplace: object.codProvedorMarketplace,
      idMarketplace: object.idMarketplace
    })
  }

  onCarregaCategorias() {
    this._list_categorias = [];

    this._api.getCategoria(false).subscribe({
      next: result => {
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this._list_categorias.push(item)
        }) 
      },
      error: erro => {
        console.error(erro)
      },
      complete: () => {
        ;
      }
    })
  }
  
  onClear() {
    this.formulario.get('codCategoriaECommercePai')?.setValue(null);
    this.onCarregaCategorias();
  }

  onRegister(event: boolean) {

    if (event)
    {
      this.base_salvando = true;

      this._api.postCategoria(this.formulario.value).subscribe({
        next: result => {
          this._location.back()
        },
        error: erro => {
          console.error(erro);
          this.base_salvando = false;
        }
      })
    }
    else {
      this._location.back();
    }

  }

}
