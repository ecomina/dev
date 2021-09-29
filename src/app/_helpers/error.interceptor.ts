import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseDialogErrorComponent } from '@app/shared/components/base-dialog-error/base-dialog-error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        public dialog: MatDialog, 
        private authenticationService: AuthenticationService) { 
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {

                alert('Falha na autenticação.\r\r'+err.error);
                this.authenticationService.logout();
                location.reload();

                // const dialogRef = this.dialog.open(BaseDialogErrorComponent, {
                //     width: '300px'})
                
                // dialogRef.afterClosed().subscribe(result => {    
                //     this.authenticationService.logout();
                //     location.reload();
                // })
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}