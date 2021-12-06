import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseTreeSelect } from '@app/modules/BaseTreeSelect';
import { BaseViewItem } from '@app/modules/BaseViewItem';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { take } from 'rxjs/operators';

interface CategoriaMarketplace {
  id: string;
  descricao: string;
  idPai: string;
  expand: boolean;
  filhos: CategoriaMarketplace[];
}

@Component({
  selector: 'app-categoria-marketplace',
  templateUrl: './categoria-marketplace.component.html',
  styleUrls: ['./categoria-marketplace.component.css']
})
export class CategoriaMarketplaceComponent extends BaseComponent implements OnInit {

  _categorias: CategoriaMarketplace[] = []; 
  _categoriasViews: BaseViewItem[] = []; 

  get categorias() {
    return this._categorias.filter(x => x.idPai == '');
  }

  get categoriasViews() {
    return this._categoriasViews;
  }

  constructor(
    private _api: EcommerceService,
    public dialogRef: MatDialogRef<BaseComponent>) {
    super()
  }

  ngOnInit(): void {
    this.carregarCategorias()
  }

  carregarCategorias() {
    this.base_carregando = true;
    this._api.getCategoriaProvedor(1)
    .pipe(
      take(1)
    )
    .subscribe({
      next: result => {
        this.montarArvoreCategoria(result)
      }
    })
  }

  onExpand(categoria: CategoriaMarketplace) {
    categoria.expand = !categoria.expand;
  }

  montarArvoreCategoria(categorias: any[]) {

    categorias.forEach(c => {

      let item = new BaseViewItem();

      item.id = c.id
      item.idPai = c.idPai
      item.descricao = c.descricao
      item.object = c

      this._categoriasViews.push(item);

      // const categoria: CategoriaMarketplace = {
      //   id: c.id,
      //   descricao: c.descricao,
      //   idPai: c.idPai,
      //   expand: false,
      //   filhos: this.carregaFilhos(categorias, c.id)
      // } 

      // this._categorias.push(categoria)
    })

    this.base_carregando = false;
  }

  carregaFilhos(categorias: any[], paiId: any) : CategoriaMarketplace[] {
    const filhos = categorias.filter(x => x.idPai != '' && x.idPai === paiId);
    return filhos;
  }

  onSelecionar(categoria: CategoriaMarketplace) {
    this.dialogRef.close(categoria)
  }

  onSeleciona(categoria: any) {
    this.dialogRef.close(categoria)
  }

  onCarregarFilhos(pai: BaseTreeSelect) {
    pai.carregando = true;
    this._api.getCategoriaProvedor(1, pai.codigo)
    .pipe(
      take(1)
    )
    .subscribe({
      next: result => {
       result.forEach(x => {
         pai.filhos.push({
          codigo: x.id,
          descricao: x.descricao,
          selecionado: false,
          objValue: x,
          filhos : []
        })
      })
      pai.carregando = false;
      pai.expandir = true;
    }})
  }


  onClose() {
    this.dialogRef.close(null);
  }



}