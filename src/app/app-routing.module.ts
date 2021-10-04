import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavigateMainComponent } from './components/navigate-main/navigate-main.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { SharedGlobalModule } from './shared/shared-global/shared-global.module';
import { AppConfigurarion } from './_config/app-configuration';
import { AppConfigurarionJsonService } from './_config/app-configuration-json-service';
import { AuthGuard } from './_helpers/auth.guard';

export function initializerFn(jsonConfigService: AppConfigurarionJsonService) {
  return () => {
    return jsonConfigService.load();
  }
}

const routes: Routes = [
  { path: '',
    component: NavigateMainComponent,
    loadChildren: () => import('@app/components/navigate-main/navigate-main.module').then(m => m.NavigateMainModule),
    canActivate: [AuthGuard],
    // children: [
    //   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    //   { path: 'categoria', component: CategoriaListComponent, canActivate: [AuthGuard] },
    // ]
  },
  {
    path: 'login', component: UserLoginComponent,
  },

  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];

// const routes: Routes = [
//   {
//     path: '**',
//     redirectTo: 'login'
//   },
//   {
//     path: '', component: UserLoginComponent, pathMatch: 'full'
//   },
//   {
//     path: 'login', component: UserLoginComponent,
//   },
//   { 
//     path: 'main', component: NavigateMainComponent, 
//       loadChildren: () => import('@app/components/navigate-main/navigate-main.module').then(m => m.NavigateMainModule)
//   },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGlobalModule,
  ],
  exports: [RouterModule],
  providers:[
    // {
    //   provide: AppConfigurarion,
    //   deps: [HttpClient],
    //   useExisting: AppConfigurarionJsonService
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppConfigurarionJsonService],
    //   useFactory: initializerFn
    // }
  ]
})
export class AppRoutingModule { }
