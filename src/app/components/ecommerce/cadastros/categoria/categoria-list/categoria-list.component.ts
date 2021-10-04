import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { CategoriaEditComponent } from '../categoria-edit/categoria-edit.component';

interface Categoria {
  codigo: number,
  descricao: string,
  ativo: boolean;
  pai: number;
  filhos : Categoria[]
}

const TREE_DATA: Categoria[] = [
  {
    codigo: 1,
    descricao: 'Categoria 1',
    ativo: true,
    pai: 0,
    filhos: [
      {
        codigo: 11,
        descricao :'Categoria 1.1',
        ativo: true,
        pai: 0,
        filhos: []
      },
      {
        codigo: 12,
        descricao :'Categoria 1.2',
        ativo: true,
        pai: 0,
        filhos: []
      },      
    ]
  }, 
  {
    codigo: 2,
    descricao: 'Categoria 2',
    ativo: true,
    pai: 0,
    filhos: [
      {
        codigo: 21,
        descricao :'Categoria 2.1',
        ativo: true,
        pai: 0,
        filhos: []
      },
      {
        codigo: 22,
        descricao :'Categoria 2.2',
        ativo: true,
        pai: 0,
        filhos: [
          {
            codigo: 221,
            descricao :'Categoria 2.2.1',
            ativo: true,
            pai: 0,
            filhos: []
          },
          {
            codigo: 222,
            descricao :'Categoria 2.2.2',
            ativo: true,
            pai: 0,
            filhos: []
          }
        ]
      }
    ]
  }, 
];

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
export class CategoriaListComponent implements OnInit {

  list = TREE_DATA;
  html: string;
  base_carregando = false;

  categorias: any[] = [
    {
      "codigo": 1,
      "descricao": "Calçados",
      "codCategoriaECommercePai": null,
      "ativo": true
    },
    {
      "codigo": 2,
      "descricao": "Confecção",
      "codCategoriaECommercePai": null,
      "ativo": true
    },
    {
      "codigo": 3,
      "descricao": "Camisa",
      "codCategoriaECommercePai": 2,
      "ativo": true
    },
    {
      "codigo": 4,
      "descricao": "Calça",
      "codCategoriaECommercePai": 2,
      "ativo": true
    },
    {
      "codigo": 5,
      "descricao": "Bermuda",
      "codCategoriaECommercePai": 1,
      "ativo": true
    },
    {
      "codigo": 6,
      "descricao": "Calcinha",
      "codCategoriaECommercePai": 5,
      "ativo": true
    }    
  ]

  margin(n: any) {
    return "margin-left: "+n+"px;"
  }


  constructor(
    private _api: EcommerceService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer) {
      this.onListar();
  }

  ngOnInit(): void {

    

    var elements = document.getElementsByClassName("filho");

    for (let i=0;i<elements.length;i++) {
      elements[i].addEventListener("click", function() {
        console.log("click")
      })

      elements[i].classList.add("papai");
    }
  }

  onListar() {
    this._api.getCategoria().subscribe({
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

    //console.log(html);
      
    return html;
  }

  onClick(event: any) {
    console.log(event);
  }

  onEdit(obj: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      confirmou: false,
      data: obj}

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CategoriaEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
  }


  onAdd(obj: any) {

    if (obj != null)
    {
      obj.pai = obj.codigo;
      obj.codigo = null,
      obj.descricao = null;
      obj.ativo = true;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      confirmou: false,
      data: obj}

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CategoriaEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.onListar();
    })
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

    console.log(array, this.list)
  }

  onFindPai(filhos: Categoria[], pai: number) : any {
   
    for (let i=0; i < filhos.length; i++)
    {
      if (filhos[i].codigo == pai)
      {
        console.log('achou')
        return filhos[i]
      }
      else
      {
        const achou = this.onFindPai(filhos[i].filhos, pai);
        if (achou != undefined) 
        {
          console.log('achou')
          return achou;
        }
      }
    }

  }

}