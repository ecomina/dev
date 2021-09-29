import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateMainRoutingModule } from './navigate-main-routing.module';
import { SharedGlobalModule } from '@app/shared/shared-global/shared-global.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from '../home/home.component';
import { CategoriaListComponent } from '../ecommerce/categoria-list/categoria-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/_helpers/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores-list/cores-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoriaListComponent,
    CadastrosMainComponent,
    CoresListComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    SharedGlobalModule,

    NavigateMainRoutingModule
  ],
  exports:[
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class NavigateMainModule { }
