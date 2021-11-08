import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { catchError, take } from 'rxjs/operators';

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

  get categorias() {
    return this._categorias.filter(x => x.idPai == '');
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
      const categoria: CategoriaMarketplace = {
        id: c.id,
        descricao: c.descricao,
        idPai: c.idPai,
        expand: false,
        filhos: this.carregaFilhos(categorias, c.id)
      } 

      this._categorias.push(categoria)
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

  onClose() {
    this.dialogRef.close(null);
  }


  teste: any[] = 
  [
    {
      "id": "MLB5672",
      "descricao": "Acessórios para Veículos",
      "idPai": ""
    },
    {
      "id": "MLB271599",
      "descricao": "Agro",
      "idPai": "MLB5672"
    },
    {
      "id": "MLB1403",
      "descricao": "Alimentos e Bebidas",
      "idPai": "MLB5672"
    },
    {
      "id": "MLB1071",
      "descricao": "Animais",
      "idPai": "MLB5672"
    },
    {
      "id": "MLB1367",
      "descricao": "Antiguidades e Coleções",
      "idPai": "MLB1071"
    },
    {
      "id": "MLB1368",
      "descricao": "Arte, Papelaria e Armarinho",
      "idPai": ""
    },
    {
      "id": "MLB1384",
      "descricao": "Bebês",
      "idPai": ""
    },
    {
      "id": "MLB1246",
      "descricao": "Beleza e Cuidado Pessoal",
      "idPai": ""
    },
    {
      "id": "MLB1132",
      "descricao": "Brinquedos e Hobbies",
      "idPai": ""
    },
    {
      "id": "MLB1430",
      "descricao": "Calçados, Roupas e Bolsas",
      "idPai": ""
    },
    {
      "id": "MLB1039",
      "descricao": "Câmeras e Acessórios",
      "idPai": "MLB1430"
    },
    {
      "id": "MLB1743",
      "descricao": "Carros, Motos e Outros",
      "idPai": "MLB1430"
    },
    {
      "id": "MLB1574",
      "descricao": "Casa, Móveis e Decoração",
      "idPai": "MLB1743"
    },
    {
      "id": "MLB1051",
      "descricao": "Celulares e Telefones",
      "idPai": ""
    },
    {
      "id": "MLB1500",
      "descricao": "Construção",
      "idPai": ""
    },
    {
      "id": "MLB5726",
      "descricao": "Eletrodomésticos",
      "idPai": ""
    },
    {
      "id": "MLB1000",
      "descricao": "Eletrônicos, Áudio e Vídeo",
      "idPai": ""
    },
    {
      "id": "MLB1276",
      "descricao": "Esportes e Fitness",
      "idPai": ""
    },
    {
      "id": "MLB263532",
      "descricao": "Ferramentas",
      "idPai": ""
    },
    {
      "id": "MLB12404",
      "descricao": "Festas e Lembrancinhas",
      "idPai": ""
    },
    {
      "id": "MLB1144",
      "descricao": "Games",
      "idPai": ""
    },
    {
      "id": "MLB1459",
      "descricao": "Imóveis",
      "idPai": ""
    },
    {
      "id": "MLB1499",
      "descricao": "Indústria e Comércio",
      "idPai": ""
    },
    {
      "id": "MLB1648",
      "descricao": "Informática",
      "idPai": ""
    },
    {
      "id": "MLB218519",
      "descricao": "Ingressos",
      "idPai": ""
    },
    {
      "id": "MLB1182",
      "descricao": "Instrumentos Musicais",
      "idPai": ""
    },
    {
      "id": "MLB3937",
      "descricao": "Joias e Relógios",
      "idPai": ""
    },
    {
      "id": "MLB1196",
      "descricao": "Livros, Revistas e Comics",
      "idPai": ""
    },
    {
      "id": "MLB1168",
      "descricao": "Música, Filmes e Seriados",
      "idPai": ""
    },
    {
      "id": "MLB264586",
      "descricao": "Saúde",
      "idPai": ""
    },
    {
      "id": "MLB1540",
      "descricao": "Serviços",
      "idPai": ""
    },
    {
      "id": "MLB1953",
      "descricao": "Mais Categorias",
      "idPai": ""
    }
  ]

}