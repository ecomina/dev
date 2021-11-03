import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateMainRoutingModule } from './navigate-main-routing.module';
import { SharedGlobalModule } from '@app/shared/shared-global/shared-global.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from '../home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/_helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores/cores-list/cores-list.component';
import { CoresEditComponent } from '../ecommerce/cadastros/cores/cores-edit/cores-edit.component';
import { GradeListComponent } from '../ecommerce/cadastros/grade/grade-list/grade-list.component';
import { GradeEditComponent } from '../ecommerce/cadastros/grade/grade-edit/grade-edit.component';
import { MarcaEditComponent } from '../ecommerce/cadastros/marca/marca-edit/marca-edit.component';
import { MarcaListComponent } from '../ecommerce/cadastros/marca/marca-list/marca-list.component';
import { CategoriaListComponent } from '../ecommerce/cadastros/categoria/categoria-list/categoria-list.component';
import { CategoriaEditComponent } from '../ecommerce/cadastros/categoria/categoria-edit/categoria-edit.component';
import { FiltroEditComponent } from '../ecommerce/cadastros/filtro/filtro-edit/filtro-edit.component';
import { FiltroListComponent } from '../ecommerce/cadastros/filtro/filtro-list/filtro-list.component';
import { DimensaoListComponent } from '../ecommerce/cadastros/dimensao/dimensao-list/dimensao-list.component';
import { DimensaoEditComponent } from '../ecommerce/cadastros/dimensao/dimensao-edit/dimensao-edit.component';
import { TamanhoListComponent } from '../ecommerce/cadastros/tamanho/tamanho-list/tamanho-list.component';
import { TamanhoEditComponent } from '../ecommerce/cadastros/tamanho/tamanho-edit/tamanho-edit.component';
import { ProdutoListComponent } from '../ecommerce/produtos/produto-list/produto-list.component';
import { ProdutoEditComponent } from '../ecommerce/produtos/produto-edit/produto-edit.component';
import { ProdutoDimensoesComponent } from '../ecommerce/produtos/produto-dimensoes/produto-dimensoes.component';
import { ProdutoItensComponent } from '../ecommerce/produtos/produto-itens/produto-itens.component';
import { ProdutoFotosComponent } from '../ecommerce/produtos/produto-fotos/produto-fotos.component';
import { ProdutoFotoCorComponent } from '../ecommerce/produtos/produto-foto-cor/produto-foto-cor.component';
import { PedidoListComponent } from '../ecommerce/pedidos/pedido-list/pedido-list.component';
import { PedidoEditComponent } from '../ecommerce/pedidos/pedido-edit/pedido-edit.component';
import { PedidoFilterComponent } from '../ecommerce/pedidos/pedido-filter/pedido-filter.component';
import { FiltroMarketplaceComponent } from '../ecommerce/cadastros/filtro/filtro-marketplace/filtro-marketplace.component';

// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'DD MM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'DD MM YYYY',
//   },
// };


@NgModule({
  declarations: [
    HomeComponent,
    CategoriaListComponent,
    CategoriaEditComponent,
    CadastrosMainComponent,
    CoresListComponent,
    CoresEditComponent,
    GradeListComponent,
    GradeEditComponent,
    MarcaEditComponent,
    MarcaListComponent,
    FiltroEditComponent,
    FiltroListComponent,  
    FiltroMarketplaceComponent,
    DimensaoListComponent,
    DimensaoEditComponent,  
    TamanhoListComponent,
    TamanhoEditComponent,
    ProdutoListComponent,
    ProdutoEditComponent,
    ProdutoDimensoesComponent,
    ProdutoItensComponent,
    ProdutoFotosComponent,
    ProdutoFotoCorComponent,
    PedidoListComponent,
    PedidoEditComponent,
    PedidoFilterComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGlobalModule,
    NavigateMainRoutingModule
  ],
  exports:[
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class NavigateMainModule { }
