import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigurarion } from '@app/_config/app-configuration';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  get urlApi() {
    return environment.API_URL;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private _httpClient: HttpClient,
    private _appConfig: AppConfigurarion) { }


  getCategoria() : Observable<any[]> {

    var url = this.urlApi+'api/Categoria';

    var result = this._httpClient.get<any[]>(url, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getCor() : Observable<any[]> {

    var url = this.urlApi+'api/Cor';

    var result = this._httpClient.get<any[]>(url, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = `Err ${error.error.message}`;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.error(errorMessage);
    alert(errorMessage);
    return throwError(errorMessage);
    //return errorMessage;
  };


}


