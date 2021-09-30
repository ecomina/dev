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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrosMainComponent } from '../ecommerce/cadastros/cadastros-main/cadastros-main.component';
import { CoresListComponent } from '../ecommerce/cadastros/cores/cores-list/cores-list.component';
import { CoresEditComponent } from '../ecommerce/cadastros/cores/cores-edit/cores-edit.component';
import { GradeListComponent } from '../ecommerce/cadastros/grade/grade-list/grade-list.component';
import { GradeEditComponent } from '../ecommerce/cadastros/grade/grade-edit/grade-edit.component';
import { MarcaEditComponent } from '../ecommerce/cadastros/marca/marca-edit/marca-edit.component';
import { MarcaListComponent } from '../ecommerce/cadastros/marca/marca-list/marca-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoriaListComponent,
    CadastrosMainComponent,
    CoresListComponent,
    CoresEditComponent,
    GradeListComponent,
    GradeEditComponent,
    MarcaEditComponent,
    MarcaListComponent,    
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class NavigateMainModule { }
