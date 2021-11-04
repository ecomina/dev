import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavigateMainComponent } from './components/navigate-main/navigate-main.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { SharedGlobalModule } from './shared/shared-global/shared-global.module';
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
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: UserLoginComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedGlobalModule,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
