import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '@app/core/services/ecommerce.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categorias: any[] = [];

  constructor(
    private _api: EcommerceService
  ) { }

  ngOnInit(): void {
  }

  onCarregar() {

    this._api.getCategoria().subscribe(result => {
      this.categorias = [];
      result.forEach(o => {
        this.categorias.push(o);
      })
    })
    
  }

}
