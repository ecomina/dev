import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { AppConfigurarion } from '@app/_config/app-configuration';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    get urlApi_auth() {
        return this._appConfig.apiUrl_auth;
    }

    constructor(
        private _appConfig: AppConfigurarion,
        private authenticationService: AuthenticationService) { 
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Params', request.url, request.urlWithParams)

        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;

        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.API_URL_Auth);

        if (isLoggedIn /*&& isApiUrl*/) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}