import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedido-edit',
  templateUrl: './pedido-edit.component.html',
  styleUrls: ['./pedido-edit.component.css']
})
export class PedidoEditComponent extends BaseRegisterComponent implements OnInit {

  get formPedido() {
    return this.formulario.value;
  }

  get codigoPedido() {
    if (this.formPedido.codigo != null)
      return String(this.formPedido.codigo).padStart(6, '0')
    else
      return '000000'
  }

  get itensControl() : FormArray {
    return this.formulario.get('itens') as FormArray;
  }

  get pagamentosControl() : FormArray {
    return this.formulario.get('pagamentos') as FormArray;
  }

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _api: EcommerceService,
    private _builder: FormBuilder
  ) { 
    super();
    this.createForm();
  }

  ngOnInit(): void {
    this.onCarregar();
  
    this.formulario.valueChanges.subscribe(value => {
      this.base_editado =  !this.base_processando;
    }) 
  }

  onBack() {
    this._location.back();
  }

  createForm() {
    this.formulario = this._builder.group({
      codigo: 0,
      codProvedorMarketplace: null,
      descricaoMarketplace: null,
      pedidoMarketplace: this._builder.group({
        idMarketplacePedido: null,
        dataUltimaAlteracao: null,
        status: null
      }),
      dataPedido: null,
      dataIntegracao: null,
      status: null,
      statusPedidoMarketplace: null,
      descricaoStatus: null,
      cliente: this._builder.group({
        cpfCnpj: null,
        nome: null,
        telefone: null,
        email: null,
        enderecoEntrega: this._builder.group({
          nomeContato: null,
          telefoneContato: null,
          logradouro: null,
          endereco: null,
          numero: null,
          complemento: null,
          bairro: null,
          cidade: null,
          uf: null,
          cep: null}),
        enderecoCobranca: this._builder.group({
          nomeContato: null,
          telefoneContato: null,
          logradouro: null,
          endereco: null,
          numero: null,
          complemento: null,
          bairro: null,
          cidade: null,
          uf: null,
          cep: null})
        }),
      valorBruto: 0,
      valorAcrescimo: 0,
      valorDesconto: 0,
      valorFrete: 0,
      valorLiquido: 12,
      valorPagoCliente: 12,
      valorComissaoMarketplace: 0,
      itens: this._builder.array([]),
      pagamentos: this._builder.array([]),
    }) 
  }

  onCarregar() {

    const codigo = this._activatedRoute.snapshot.paramMap.get('codigo');

    this._api.getPedidoCodigo(codigo).subscribe({
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

  buildForm(pedido: any) {
    this.formulario.patchValue(pedido);
    this.buildItens(pedido.itens)
    this.buildPagamentos(pedido.pagamentos)
  }

  buildItens(itens: any[]) {

    itens.forEach(x => {
      const item = this._builder.group({
        sequencial: x.sequencial,
        codItemProdutoECommerce: x.codItemProdutoECommerce,
        quantidade: x.quantidade,
        valorUnitario: x.valorUnitario,
        valorTotalBruto: x.valorTotalBruto,
        valorTotalAcrescimo: x.valorTotalAcrescimo,
        valorTotalDesconto: x.valorTotalDesconto,
        valorTotalFrete: x.valorTotalFrete,
        valorTotalLiquido: x.valorTotalLiquido,
        valorTotalComissaoMarketplace: x.valorTotalComissaoMarketplace,
        item: this.buildItem(x.item),
        pedidoItemMarketplace: this._builder.group({
          idMarketplaceItem: x.pedidoItemMarketplace.idMarketplaceItem,
          descricao: x.pedidoItemMarketplace.descricao,
          cor: x.pedidoItemMarketplace.cor,
          tamanho: x.pedidoItemMarketplace.tamanho})
      })

      this.itensControl.push(item)
    })
  }

  buildItem(item: any) : FormGroup {

    return this._builder.group({
      produtoCor: item.produtoCor})

  }

  buildPagamentos(pagamentos: any[]) {
    pagamentos.forEach(x => {

      const pgto = this._builder.group({
      sequencial: x.sequencial,
      valorPagamento: x.valorPagamento,
      pedidoPagamentoMarketplace: this._builder.group({
        idMarketplacePagamento: x.pedidoPagamentoMarketplace.idMarketplacePagamento,
        descricao: x.pedidoPagamentoMarketplace.descricao,
        dataPagamento: x.pedidoPagamentoMarketplace.dataPagamento,
        dataAprovacaoPagamento: x.pedidoPagamentoMarketplace.dataAprovacaoPagamento,
        status: x.pedidoPagamentoMarketplace.status}),
      statusPagamento: x.statusPagamento})

      this.pagamentosControl.push(pgto)
    })

  }
}
