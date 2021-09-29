import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-cadastros-main',
  templateUrl: './cadastros-main.component.html',
  styleUrls: ['./cadastros-main.component.css']
})
export class CadastrosMainComponent extends BaseComponent implements OnInit {

  itensMenu: any[] = [
    {
      titulo: 'Cores',
      descricao: 'Cores de produtos',
      icon: 'color_lens',
      link: 'cadastros/cores'
    },
    {
      titulo: 'Marcas',
      descricao: 'Marcas',
      icon:'branding_watermark',
      link: 'cores'
    },
    {
      titulo: 'Categorias',
      descricao: 'Categorias do marketplace',
      icon:'category',
      link: 'cores'
    },
    {
      titulo: 'Dimensões',
      descricao: 'Dimensões de embalagens',
      icon:'',
      link: 'cores'
    },
    {
      titulo: 'Filtros',
      descricao: 'Filtros da site',
      icon:'',
      link: 'cores'
    },
  ]

  constructor(
    private _router: Router
  ) { 
    super();
  }

  ngOnInit(): void {
    this.base_title = "Parâmetros"
  }

  onAbrir(item: any) {
    this._router.navigate([item.link]);
  }

}
