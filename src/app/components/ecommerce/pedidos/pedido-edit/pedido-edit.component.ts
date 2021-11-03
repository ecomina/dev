import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseRegisterComponent } from '@app/shared/components/base-register/base-register.component';

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

  constructor(
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


  }

}
