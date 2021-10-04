import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedGlobalModule } from '@app/shared/shared-global/shared-global.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CategoriaListComponent } from '../ecommerce/cadastros/categoria/categoria-list/categoria-list.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores/cores-list/cores-list.component';
import { GradeListComponent } from '../ecommerce/cadastros/grade/grade-list/grade-list.component';
import { MarcaListComponent } from '../ecommerce/cadastros/marca/marca-list/marca-list.component';
import { TamanhoListComponent } from '../ecommerce/cadastros/tamanho/tamanho-list/tamanho-list.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cadastros', component: CadastrosMainComponent,
    children: [  

    ]
  },
      { path: 'cadastros/cores', component: CoresListComponent },
      { path: 'cadastros/grade', component: GradeListComponent },
      { path: 'cadastros/marca', component: MarcaListComponent },
      { path: 'cadastros/tamanho', component: TamanhoListComponent },
      { path: 'cadastros/categoria', component: CategoriaListComponent },
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
    // NgxCurrencyModule,
    SharedGlobalModule],
  exports: [RouterModule]
})
export class NavigateMainRoutingModule { }
