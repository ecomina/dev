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
      titulo: 'Grades',
      descricao: 'Grade de tamanhos',
      icon: 'grid_on',
      link: 'cadastros/grade'
    },
    {
      titulo: 'Tamanhos',
      descricao: 'Tamanhos de produtos',
      icon: 'zoom_out_map',
      link: 'cadastros/tamanho'
    },
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
      link: 'cadastros/marca'
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
      icon:'aspect_ratio',
      link: 'cores'
    },
    {
      titulo: 'Filtros',
      descricao: 'Filtros da site',
      icon:'filter',
      link: 'cores'
    },
  ]

  txt_filtro: string = '';

  get list() {
    let result = this.itensMenu;

    if (this.txt_filtro.length > 0)
      result =  result.filter(m => (m.titulo+m.descricao).toUpperCase().includes(this.txt_filtro.toUpperCase()));

    return result;
  }

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

  onFiltrar(event: any) {
    this.txt_filtro = event;
  }

}
