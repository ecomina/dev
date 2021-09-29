import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/modules/user';

@Component({
  selector: 'app-navigate-main',
  templateUrl: './navigate-main.component.html',
  styleUrls: ['./navigate-main.component.css']
})
export class NavigateMainComponent extends BaseComponent {

  currentUser: User;
  panelOpenState = false;
  links: any[];
  menuLinks: any[] = [
    {
      caption: 'Pedidos',
      submenus: [
        {
          caption: 'Dashboard',
          link:'dashboard'
        },
        {
          caption: 'Pesquisa',
          link:'pesquisa'
        },
        {
          caption: 'Cancelamento',
          link:'cancelamento'
        },
      ]
    },
    {
      caption: 'Cadastros',
      submenus: [
        {
          caption: 'Produto',
          link:'produto'
        },
        {
          caption: 'Parametros',
          link:'cadastros'
        },
      ]
    },
    {
      caption: 'Configurações',
      submenus: [
        {
          caption: 'Plataformas',
          link:'plataforma'
        },
        {
          caption: 'Sistema',
          link:'sistema'
        },
      ]
    },
    {
      caption: 'Conta',
      submenus: [
        {
          caption: 'Usuário',
          link:'usuario'
        },
        {
          caption: 'Credenciais',
          link:'senha'
        }
      ]
    }       
  ]

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    public dialog: MatDialog) {
      super();
      this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
      // //this._router.navigate(['home']);
      // //this.onCarregarLinks();
      // this.base_title = "Home";
  
      this._breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe( (state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
             console.log( 'Matches XSmall viewport');
        }
        if (state.breakpoints[Breakpoints.Small]) {
             console.log( 'Matches Small viewport');
        }
        if (state.breakpoints[Breakpoints.Medium]) {
             console.log( 'Matches Medium  viewport');
        }
        if (state.breakpoints[Breakpoints.Large]) {
  
            console.log( 'Matches Large viewport');
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
  
           console.log( 'Matches XLarge viewport');   
        }
      });
  
    }

    onHome() {
      this._router.navigate(['home']);
    }
  
    onLogout() {
      this._authenticationService.logout();
      this._router.navigate(['/login']);
    }
  
    onRouterLink(menu: any, subMenu: any)
    {
      this.base_title =  menu.caption +' / '+ subMenu.caption;
      this._router.navigate([subMenu.link]);
    }
  

}
