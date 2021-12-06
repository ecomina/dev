import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { Subject } from 'rxjs';
import { take} from 'rxjs/operators';

interface Categoria {
  codigo: number,
  descricao: string,
  ativo: boolean;
  pai: number;
  filhos : Categoria[]
}

const TREE_DATA: Categoria[] = [];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriaListComponent implements OnInit, OnDestroy {

  list = TREE_DATA;
  html: string;
  base_carregando = false;

  categorias: any[] = []

  unsub$ = new Subject()

  margin(n: any) {
    return "margin-left: "+n+"px;"
  }

  constructor(
    private _api: EcommerceService,
    private _router: Router,
    private sanitizer: DomSanitizer) {
      this.onListar();
  }

  ngOnInit(): void {

    var elements = document.getElementsByClassName("filho");

    for (let i=0;i<elements.length;i++) {
      elements[i].addEventListener("click", function() {
      })

      elements[i].classList.add("papai");
    }
  }

  ngOnDestroy() {
    // this.unsub$.next();
    // this.unsub$.complete();    
  }

  onListar() {
    this._api.getCategoria()
    .pipe(
      //takeUntil(this.unsub$)
      take(1)
    ) 
    .subscribe({
      next: result => {
        this.base_carregando = true;
        this.categorias = [];

        result.forEach(o => {
          this.categorias.push({
            codigo: o.codigo,
            descricao: o.descricao,
            codCategoriaECommercePai: o.codCategoriaECommercePai,
            ativo: o.ativo})
        })
      },
      error: erro => {
        this.base_carregando = false;
        console.error(erro);
      },
      complete: () => {
        this.base_carregando = false;
        this.onCarregar();
      }
    })
  }

  onCreateTree(filhos: Categoria[]) : string {
    
    if (filhos.length === 0)
      return '';

    let html: string = "<ul class='pai'><button (click)='onClick()'>OK</button> ";

    filhos.forEach(p => {
      html += "<li class='filho'  >"+p.descricao
      html += this.onCreateTree(p.filhos);
      html += "</li>";
    })
    
    html += "</ul>"

    return html;
  }

  public iconCheck(check: boolean) {
    return  (check) ? 'check_box' : 'check_box_outline_blank';
  }

  onEdit(codigo: any) {
    this._router.navigate(['cadastros/categoria/edit', codigo])
  }

  onAdd(codigoPai: any) {
    this._router.navigate(['cadastros/categoria/new', codigoPai])
  }

  onDelete(obj: any){
    
  }

  onCarregar() {

    this.list = [];
    var array = this.categorias.sort((a, b) => a.codCategoriaECommercePai - b.codCategoriaECommercePai);

    array.forEach(c => {

      const categoria: Categoria = 
        {
          codigo: c.codigo,
          descricao: c.descricao,
          ativo: c.ativo,
          pai: (c.codCategoriaECommercePai === null) ? 0 : c.codCategoriaECommercePai,
          filhos: []
        }

        const pai = this.onFindPai(this.list, categoria.pai) as Categoria;
        
        if (pai === undefined)
        {
          this.list.push(categoria);
        }
        else{
          pai.filhos.push(categoria);
        }
    })

  }

  onFindPai(filhos: Categoria[], pai: number) : any {
   
    for (let i=0; i < filhos.length; i++)
    {
      if (filhos[i].codigo == pai)
      {
        return filhos[i]
      }
      else
      {
        const achou = this.onFindPai(filhos[i].filhos, pai);
        if (achou != undefined) 
        {
          return achou;
        }
      }
    }
  }

}
