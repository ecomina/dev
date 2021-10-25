import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent extends BaseComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  img_vyaonline = '../../../../assets/images/vyaonline.png';

  get formLogin() {
    return this.formulario.controls;
  }

  get canConfirm() {
    return this.formulario.valid;
  }

  get txtAcessar() {
    return (this.loading) ? 'Carregando...' : 'Acessar';
  }

  get classLoading() {
    return (this.loading) ? 'loading' : '';
  }

  constructor(
    public dialog: MatDialog, 
    private _formBuilder: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthenticationService) { 
      super();
      
      if (this.authenticationService.currentUserValue) { 
        this._router.navigate(['/']);
    }
  }  

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formulario = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]});
  }

  getErrorMessage() {
    if ( this.formLogin.email.hasError('required')) {
      return 'Informa seu usuário';
    }

    return  this.formLogin.email.hasError('email') ? 'Não é um email válido' : '';
  }

  onSubmit() {
    this.submitted = true;
console.log('Login')
    // stop here if form is invalid
    if (this.formLogin.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.formLogin.email.value, this.formLogin.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from route parameters or default to '/'
                const returnUrl = this._activeRoute.snapshot.queryParams['returnUrl'] || '/';
                this._router.navigate([returnUrl]);
                this.loading = false;
            },
            error: error => {
               //alert(error);
                this.error = error;
                this.loading = false;
            }
        });
  }

}
