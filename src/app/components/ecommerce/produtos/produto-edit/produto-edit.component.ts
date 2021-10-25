import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import {Location} from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent extends BaseRegisterComponent implements OnInit, OnDestroy {

  private history_nav: string[] = []
  private list_marcas: any[] = [];
  private fotosPosicaoUp: any[] = [];
  public list_categorias: any[] = [];
  public tabIndex = 0;

  get coresControls() : FormArray {
    return this.formulario.get('cores') as FormArray;
  }

  get obs_marcas() : Observable<any[]> {
    return of(this.list_marcas);
  }

  get id_combo_marca() {
    return this.formulario.value.codMarca;
  }

  get obs_categorias() : Observable<any[]> {
    return of(this.list_categorias);
  }

  get id_combo_categoria() {
    return this.formulario.value.codCategoriaPrincipal;
  }

  get formDimensao() {
    return this.formulario.get('dimensao');
  }

  get codigoProduto() {
    return this.formulario.get('codigo')?.value;
  }

  get canView() {
    return !this.base_processando && this.tabIndex != 2;
  }

  constructor(
    private _location: Location,
    private _router: Router,
    private _builder : FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _api: EcommerceService,
    public matDialog: MatDialog) { 
      super();
      this.baseMatDialog = this.matDialog;

      this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.history_nav.push(event.urlAfterRedirects)
        }
      })

      this.base_processando = true;

      this.createForm();
  }

  ngOnInit(): void {
    this.onCarregar();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
  }

  onBack(): void {
    this._location.back();
    // this.history_nav.pop();
    // if (this.history_nav.length > 0) {
    //   this._location.back();
    //   console.log('onBack', this.history_nav);
    // }
    // else {
    //   this._router.navigateByUrl('/')
    // }
  }

  onTab(event: any) {
    alert(event);
  }

  createForm() {
    this.formulario = this._builder.group({
      dataCadastro: null,
      codigo: null,
      codigoNexttLegado: null,
      codMarca: [null, Validators.required],
      titulo: null,
      descricaoReduzida: null,
      descricaoCompleta: null,
      modelo: null,
      dimensao: this.builderDimensao(),
      ativo: true,
      visivelSite: true,
      mostrarProdutoEsgotado: false,
      precoCheio: 0,
      precoPor: 0,
      custo: 0,
      codCategoriaPrincipal: 4,
      filtros: null,
      cores: this._builder.array([])}) 

      this.onCarregaMarcas(); 
      this.onCarregaCategorias();     
      
      this.formulario.valueChanges.subscribe(value => {
        this.base_editado = true;
      }) 
  }

  onCarregaMarcas() {
    this._api.getMarca().subscribe({
      next: result => {
        this.base_processando = true;
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_marcas.push(item);
        })
      },
      error: erro => {
        this.base_processando = false;
        alert(erro);
      },
      complete: () => {
        this.base_processando = false;
      }
    })
  }

  onCarregaCategorias() {
    this._api.getCategoria().subscribe({
      next: result => {
        this.base_processando = true;
        result.forEach(o => {
          const item = {id: o.codigo, descricao: o.codigo+' '+o.descricao, object: o, grupo: ''}
          this.list_categorias.push(item);
        })
      },
      error: erro => {
        this.base_processando = false;
        alert(erro)
      },
      complete: () => {
        this.base_processando = false;
      }
    })
  }

  onCarregar() {

    const codigo = this._activatedRoute.snapshot.paramMap.get('codigo');

    this._api.getProdutoCodigo(codigo).subscribe({
      next: result => {
        this.base_processando = true;
        this.buildForm(result);
      },
      error: erro => {
        this.base_processando = false;
        alert(erro);
      },
      complete: () => {
        this.base_processando = false;
      }
    })
  }

  buildForm(produto: any) {

    this.formulario.patchValue(produto);

    if (produto.dimensao != null)
      this.formDimensao?.patchValue(produto.dimensao)

    const cores = this.builderCores(produto.cores).controls;

    cores.forEach(cor => {
      this.coresControls.push(cor);
    })
  }

  builderDimensao() {
    return this._builder.group({
      dimensaoProduto: this._builder.group({
        peso: [0, Validators.required],
        altura: [0, Validators.required],
        largura: [0, Validators.required],
        profundidade: [0, Validators.required]
      }),
      dimensaoEmbalagem: this._builder.group({
        peso: [0, Validators.required],
        altura: [0, Validators.required],
        largura: [0, Validators.required],
        profundidade: [0, Validators.required]
      })
    })
  }

  builderCores(cores: any[]) : FormArray {

    let formArray = this._builder.array([]);

    cores.forEach(cor => {
      formArray.push(this._builder.group({
        codCorECommerce: cor.codCorECommerce,
        descricao: cor.descricao,
        principal: cor.principal,
        ativo: cor.principal,
        itens: this.builderItens(cor.itens)
      }))
    })

    return formArray;

  }

  builderItens(itens: any[]) : FormArray {

    let formArray = this._builder.array([]);

    itens.forEach(i => {
      formArray.push(
        this._builder.group({
          descricao: i.descricao,
          ean13: i.ean13 ,
          codTamanhoECommerce: i.codTamanhoECommerce,
          ativo: i.ativo})
      )
    })

    return formArray;
  }

  onRegister(event: boolean) {

    if (event) {
      this.base_salvando = true;

      this._api.postProduto(this.formulario.value).subscribe({
        next: () => {
          //alert('Produto salva com sucesso!')
        },
        error: erro => {
          console.error(erro);
          this.base_salvando = false;
          this.onBack();
        },
        complete: () => {
          this.base_salvando = false;
          if (this.fotosPosicaoUp.length > 0)
          {
            this._api.postFotoUrl(this.fotosPosicaoUp);
          }

          this.baseDialogSucess("Registro atualizado com sucesso!").afterClosed()
            .subscribe(() => {
              this.onBack();
            })
        }
      })
    }
    else {
      this.onBack();
    }
  }

  onCodNextt() {
    alert('Cod Legado')
  }

  onComboChange(event: any, combo: any) {
    this.formulario.get(combo)?.setValue(event.id);
  }

  onPosicaoUp(event: any[]) {
    this.fotosPosicaoUp =  event;
  }

}
