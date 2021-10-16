import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-produto-fotos',
  templateUrl: './produto-fotos.component.html',
  styleUrls: ['./produto-fotos.component.css']
})
export class ProdutoFotosComponent extends BaseComponent implements OnInit {

  @Input() set codProduto(codProduto: any) {
    if (codProduto != null)
      this.onCarregarFoto(codProduto);
  }

  get imgSemfoto() : string {
    return "../../../../../assets/images/semfoto.jfif";
  }
  
  get fotosControl() {
    return this.formularioArray;
  }

  constructor(
    private _api: EcommerceService,
    private _builder: FormBuilder) { 
    super();
      this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioArray = this._builder.array([]);
  }

  onCarregarFoto(codProduto: number) {
    this._api.getProdutoFotos(codProduto).subscribe({
      next: result => {
        result.forEach(f => {
          const control = this._builder.group({
            codProdutoEcommerce: f.codProdutoEcommerce,
            codCor: f.codCor,
            posicao: f.posicao,
            urlImagem: f.urlImagem});

          this.formularioArray.push(control);
        })
      }
    })
  }

}
