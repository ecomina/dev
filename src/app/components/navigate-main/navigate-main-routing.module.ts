import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedGlobalModule } from '@app/shared/shared-global/shared-global.module';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores-list/cores-list.component';
import { CategoriaListComponent } from '../ecommerce/categoria-list/categoria-list.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cadastros', component: CadastrosMainComponent,
    // children: [
    //   { path: 'cores', component: CoresListComponent }
    // ]
  },
   { path: 'cadastros/cores', component: CoresListComponent },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'categoria', component: CategoriaListComponent
  }
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
