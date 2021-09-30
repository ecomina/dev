import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigateMainComponent } from './components/navigate-main/navigate-main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { BaseComponent } from './shared/components/base/base.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedGlobalModule } from './shared/shared-global/shared-global.module';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { AppConfigurarion } from './_config/app-configuration';
import { AppConfigurarionJsonService } from './_config/app-configuration-json-service';
import { TamanhoListComponent } from './components/ecommerce/cadastros/tamanho/tamanho-list/tamanho-list.component';
import { TamanhoEditComponent } from './components/ecommerce/cadastros/tamanho/tamanho-edit/tamanho-edit.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { BaseFormDebugComponent } from './shared/components/base-form-debug/base-form-debug.component';

export function initializerFn(jsonConfigService: AppConfigurarionJsonService) {
  return (): Promise<any> => {
    return jsonConfigService.load();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    UserLoginComponent,
    NavigateMainComponent,
    UserRegisterComponent,
    TamanhoListComponent,
    TamanhoEditComponent,
    BaseFormDebugComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    SharedGlobalModule,
    NgxCurrencyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: AppConfigurarion,
      deps: [HttpClient],
      useExisting: AppConfigurarionJsonService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigurarionJsonService],
      useFactory: initializerFn
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
