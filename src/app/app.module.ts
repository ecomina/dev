import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
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
import { NgxCurrencyModule } from 'ngx-currency';
import { MAT_DATE_LOCALE} from '@angular/material/core';

export function initializerFn(jsonConfigService: AppConfigurarionJsonService) {
  return (): Promise<any> => {
    return jsonConfigService.load();
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'DD MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    UserLoginComponent,
    NavigateMainComponent,
    UserRegisterComponent,
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
    NgxCurrencyModule,
    // NgxFileDropModule,
    // FileUploadModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: LOCALE_ID, useValue: 'pt-BR'},
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
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
