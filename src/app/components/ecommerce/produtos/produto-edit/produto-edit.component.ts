import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { Location } from '@angular/common';
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

  get filtrosControls() : FormArray {
    return this.formulario.get('filtros') as FormArray;
  }

  get marketplacesControls() : FormArray {
    return this.formulario.get('marketplaces') as FormArray;
  }

  get obs_marcas() : Observable<any[]> {
    return of(this.list_marcas);
  }

  get id_combo_marca() {
    return (this.formulario.value.marca === null) ? null : this.formulario.value.marca.codigo;
  }

  get obs_categorias() : Observable<any[]> {
    return of(this.list_categorias);
  }

  get id_combo_categoria() {
    return (this.formulario.value.categoriaPrincipal === null) ? null : this.formulario.value.categoriaPrincipal.codigo;
  }

  get formDimensao() {
    return this.formulario.get('dimensao');
  }

  get codigoProduto() {
    return this.formulario.get('codigo')?.value;
  }

  get precoControl() : FormGroup {
    return this.formulario.get('preco') as FormGroup;
  }

  get precoMarketplacesControl() : FormArray {
    return this.precoControl.get('marketplaces') as FormArray;
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
    this.onLoad();
  }

  ngOnDestroy() {
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
      codigo: null,
      codigoNexttLegado: null,
      modelo: null,
      titulo: null,
      descricaoReduzida: null,
      ativo: true,
      custo: 0,      
      descricaoCompleta: null,
      marca: this.builderMarca(),
      dimensao: this.builderDimensao(),
      preco: this._builder.group({
        precoDe: 0,
        precoPor: 0,
        marketplaces: this._builder.array([])
      }),
      visivelSite: true,
      mostrarProdutoEsgotado: false,
      categoriaPrincipal: this.builderCategoriaPrincipal(),
      cores: this._builder.array([]),
      filtros: this._builder.array([]),
      marketplaces: this._builder.array([]),
      dataCadastro: null
    }) 

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

  onLoad() {

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

    const filtros = this.builderFiltros(produto.filtros).controls;
    filtros.forEach(filtro => {
      this.filtrosControls.push(filtro);
    })

    const marketplaces = this.builderMarketplaces(produto.marketplaces).controls;
    marketplaces.forEach(marketplace => {
      this.marketplacesControls.push(marketplace);
    })

    this.builderPreco(produto.preco);

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

  builderMarca() {
    return this._builder.group({
      codigo: [0, Validators.required],
      descricao: null,
      ativo: null
    })
  }

  builderCategoriaPrincipal() {
    return this._builder.group({
      codigo: 0,
      descricao: null,
      ativo: null
    })
  }

  builderCores(cores: any[]) : FormArray {
 
    let formArray = this._builder.array([]);
    let existTrue: boolean = false;

    cores.forEach(cor => {
      let isPrincipal = cor.principal;

      if (!existTrue && isPrincipal)
          existTrue = isPrincipal;
      else
        isPrincipal = false;

      if (cor.cor != null) {
        formArray.push(this._builder.group({
          codigo: cor.codigo,
          descricao: cor.descricao,
          principal: (isPrincipal),
          ativo: cor.ativo,
          cor: this.builderCor(cor),
          itens: this.builderItens(cor.itens)
        }))
      }
    })

    return formArray;

  }

  builderCor(cor: any) : FormGroup {
    let corItem = this._builder.group({
      codigo: 0,
      descricao: null,
      ativo: true
    })

    if (cor.cor != null) {
      corItem.patchValue(cor.cor)
    }

    return corItem
  }

  builderItens(itens: any[]) : FormArray {

    let formArray = this._builder.array([]);

    itens.forEach(x => {
      formArray.push(
        this._builder.group({
          codigo: x.codigo,
          tamanho: this.builderTamanho(x.tamanho),
          descricao: x.descricao,
          ean13: x.ean13 ,
          ativo: x.ativo
        })
      )
    })

    return formArray;
  }

  builderTamanho(tamanho: any) {
    let formGroup = this._builder.group({
      codigo: null,
      descricao: null,
      ordem: 0,
      ativo: false
    })

    if (tamanho != null) {
      formGroup = this._builder.group({
        codigo: tamanho.codigo,
        descricao: tamanho.descricao,
        ordem: tamanho.ordem,
        ativo: tamanho.ativo
      })
    }

    return formGroup;
  }

  builderMarketplaces(marketplaces: any[]) : FormArray {

    let formArray = this._builder.array([]);

    marketplaces.forEach(x => {
      formArray.push(
        this._builder.group({
          desmembrarProdutosPorCor: x.desmembrarProdutosPorCor,
          ativo: x.ativo,
          descricaoProvedorMarketplace: x.descricaoProvedorMarketplace,
          descricaoMarketplace: x.descricaoMarketplace,
          idMarketplace: x.idMarketplace,
          codProvedorMarketplace: x.codProvedorMarketplace
        })
      )
    })

    return formArray;
  }

  builderFiltros(filtros: any[]) : FormArray {
    let formArray = this._builder.array([]);

    filtros.forEach(x => {
      formArray.push(
        this._builder.group({
          filtro: this._builder.group({
            descricaoTipoFiltro: x.filtro.descricaoTipoFiltro,
            codigo: x.filtro.codigo,
            descricao: x.filtro.descricao,
            obrigatorio: x.filtro.obrigatorio,
            tipoFiltro: x.filtro.tipoFiltro,
            ativo: x.filtro.ativo}),
          valor: x.valor,            
          valores: this._builder.array([]),
          detalhesSelecionado: this.buildDetalheSelecionado(x)
        })
      )
    })

    return formArray;
  }

  builderPreco(preco: any)  {
   
    if (preco != null) {

      let formArray = this.builderPrecoMarketplace(preco.marketplaces);

      formArray.controls.forEach(x => {
        this.precoMarketplacesControl.push(x)
      })
    }
  }

  builderPrecoMarketplace(marketplaces: any[]) : FormArray {

    let formArray = this._builder.array([]);

    marketplaces.forEach(x => {
      const formGroup = this._builder.group({
        codProvedorMarketplace: x.codProvedorMarketplace,
        precoDe: x.precoDe,
        precoPor: x.precoPor,
        descricaoProvedorMarketplace: x.descricaoProvedorMarketplace
      })

      formArray.push(formGroup);
    })

    return formArray;
  }

  buildFiltrosValores(valores: any[]) : FormArray {
    let formArray = this._builder.array([]);

    valores.forEach(x => {
      formArray.push(
        this._builder.group({
          codigo: x.codigo,
          valor: x.valor,
          ativo: x.ativo,
          ordem: x.ordem
        })
      )
    })

    return formArray;
  }

  buildDetalheSelecionado(filtro: any) : FormArray {
    const detalhes: any[] = filtro.detalhesSelecionado;

    let formArray = this._builder.array([]);

    if (detalhes != null) 
    {
      detalhes.forEach(x => {
        formArray.push(
          this._builder.group({
            codigo: x.codigo,
            valor: x.valor,
            ativo: x.ativo,
            ordem: x.ordem
          })
        )
      })
    }

    return formArray;
  }

  onRegister(event: boolean) {

    if (event) {
      this.base_salvando = true;

      this.filtrosControls.controls.map(x => delete x.value.valores);
      
      console.log(JSON.stringify(this.formulario.value));

      this._api.putProduto(this.codigoProduto, this.formulario.value).subscribe({
        next: () => {

          localStorage.setItem('itemDestaque_Produto', this.codigoProduto);
        
          if (this.fotosPosicaoUp.length > 0)
          {
            this._api.postFotoUrl(this.fotosPosicaoUp);
          }

          this.baseDialogSucess("Registro atualizado com sucesso!").afterClosed()
            .subscribe(() => {
              this.onBack();
            })
        },
        error: erro => {
          console.error(erro);
          this.base_salvando = false;
          this.onBack();
        },
        // complete: () => {
        //   this.base_salvando = false;

        // }
      })
    }
    else {
      this.onBack();
    }
  }

  onCodNextt() {
  }

  onComboChange(event: any, combo: any) {
    let control = this.formulario.get(combo) as FormControl;
    control.patchValue(event.object)
  }

  onPosicaoUp(event: any[]) {
    this.fotosPosicaoUp =  event;
  }

}
