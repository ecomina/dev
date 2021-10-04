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
import { BaseFormDebugComponent } from '@app/shared/components/base-form-debug/base-form-debug.component';
import { FiltroEditComponent } from '../ecommerce/cadastros/filtro/filtro-edit/filtro-edit.component';
import { FiltroListComponent } from '../ecommerce/cadastros/filtro/filtro-list/filtro-list.component';


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
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGlobalModule,
    // BaseFormDebugComponent,

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
