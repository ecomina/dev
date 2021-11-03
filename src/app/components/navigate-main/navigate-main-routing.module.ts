import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { SharedGlobalModule } from '@app/shared/shared-global/shared-global.module';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { NgxCurrencyModule } from 'ngx-currency';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CategoriaListComponent } from '../ecommerce/cadastros/categoria/categoria-list/categoria-list.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores/cores-list/cores-list.component';
import { DimensaoListComponent } from '../ecommerce/cadastros/dimensao/dimensao-list/dimensao-list.component';
import { FiltroEditComponent } from '../ecommerce/cadastros/filtro/filtro-edit/filtro-edit.component';
import { FiltroListComponent } from '../ecommerce/cadastros/filtro/filtro-list/filtro-list.component';
import { GradeListComponent } from '../ecommerce/cadastros/grade/grade-list/grade-list.component';
import { MarcaListComponent } from '../ecommerce/cadastros/marca/marca-list/marca-list.component';
import { TamanhoListComponent } from '../ecommerce/cadastros/tamanho/tamanho-list/tamanho-list.component';
import { PedidoEditComponent } from '../ecommerce/pedidos/pedido-edit/pedido-edit.component';
import { PedidoListComponent } from '../ecommerce/pedidos/pedido-list/pedido-list.component';
import { ProdutoEditComponent } from '../ecommerce/produtos/produto-edit/produto-edit.component';
import { ProdutoListComponent } from '../ecommerce/produtos/produto-list/produto-list.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cadastros', component: CadastrosMainComponent,
    children: [  
      // { path: 'cores', component: CoresListComponent, canActivate: [AuthGuard] }
    ]
  },
      { path: 'cadastros/cores', component: CoresListComponent, canActivate: [AuthGuard] },
      { path: 'cadastros/grade', component: GradeListComponent, canActivate: [AuthGuard] },
      { path: 'cadastros/marca', component: MarcaListComponent, canActivate: [AuthGuard] },
      { path: 'cadastros/tamanho', component: TamanhoListComponent, canActivate: [AuthGuard] },
      { path: 'cadastros/categoria', component: CategoriaListComponent, canActivate: [AuthGuard] },
      {
        path: 'cadastros/filtro/edit/:codigo', component: FiltroEditComponent, canActivate: [AuthGuard]
      },
      {
        path: 'cadastros/filtro/new', component: FiltroEditComponent, canActivate: [AuthGuard]
      },
      { 
        path: 'cadastros/filtro', component: FiltroListComponent, canActivate: [AuthGuard],
        children: [
          {
            path: 'cadastros/filtro/edit/:codigo', component: FiltroEditComponent, canActivate: [AuthGuard]
          }
        ]
      },
      { path: 'cadastros/dimensao', component: DimensaoListComponent, canActivate: [AuthGuard] },
      { path: 'produto/list', component: ProdutoListComponent, canActivate: [AuthGuard] },
      { path: 'produto/edit/:codigo', component: ProdutoEditComponent, canActivate: [AuthGuard] },

      { path: 'pedido/list', component: PedidoListComponent, canActivate: [AuthGuard] },
      { path: 'pedido/edit/:codigo', component: PedidoEditComponent, canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedGlobalModule],
  exports: [RouterModule]
})
export class NavigateMainRoutingModule { }
