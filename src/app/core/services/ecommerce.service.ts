import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfigurarion } from '@app/_config/app-configuration';
import { environment } from '@environments/environment';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  get urlApi() {
    return environment.API_URL;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(
    private _httpClient: HttpClient,
    private _appConfig: AppConfigurarion,
    private domSanitizer: DomSanitizer) { }

getProduto(somenteAtivos: boolean) : Observable<any[]> {

  var url = this.urlApi+'api/Produto';

  let parametros = new HttpParams();

  parametros = parametros.append('somenteAtivos', String(somenteAtivos));

  var result = this._httpClient.get<any[]>(url, { params: parametros })
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

getProdutoCodigo(codigo: any) {

  var url = this.urlApi+'api/Produto/';

  let parametros = new HttpParams();

  parametros = parametros.append('codigo', String(codigo));

  var result = this._httpClient.get<any>(url.concat(codigo))
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

postProduto(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Produto';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getCategoria(somenteAtivos: boolean = false) : Observable<any[]> {

  var url = this.urlApi+'api/Categoria';

  let parametros = new HttpParams();

  parametros = parametros.append('somenteAtivos', String(somenteAtivos));

  var result = this._httpClient.get<any[]>(url, { params: parametros })
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

postCategoria(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Categoria';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getTamanho() : Observable<any[]> {

  var url = this.urlApi+'api/Tamanho';

  var result = this._httpClient.get<any[]>(url, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

postTamanho(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Tamanho';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
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

postCor(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Cor';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getFiltro() : Observable<any[]> {

  var url = this.urlApi+'api/Filtro';

  var result = this._httpClient.get<any[]>(url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

postFiltro(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Filtro';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getGrade() : Observable<any[]> {

    var url = this.urlApi+'api/Grade';

    var result = this._httpClient.get<any[]>(url, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
}

postGrade(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Grade';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getMarca() : Observable<any[]> {

  var url = this.urlApi+'api/Marca';

  var result = this._httpClient.get<any[]>(url, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

postMarca(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Marca';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getDimensao() : Observable<any[]> {

  var url = this.urlApi+'api/Dimensao';

  var result = this._httpClient.get<any[]>(url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

postDimensao(obj: any) : Observable<any> {

  var url = this.urlApi+'api/Dimensao';

  const body = JSON.stringify(obj);

  var result = this._httpClient.post<any>(url, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;
}

getProdutoFotos(codProduto: number) : Observable<any[]> {

  var url = this.urlApi+'api/Produto/';
  url = url.concat(codProduto.toString()).concat("/Foto")

  var result = this._httpClient.get<any>(url)
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

// convertFile(file : File) : Observable<string> {
//   const result = new ReplaySubject<string>(1);
//   const reader = new FileReader();
//   reader.readAsBinaryString(file);
//   reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
//   return result;
// }

postFotoBase64(codProduto: any, codCor: any, codPosicao: any, body: any) :Observable<any> {
 
  var url = this.urlApi+'api/Produto/';
  url = url.concat(codProduto).concat("/Cor/").concat(codCor).concat("/Foto/").concat(codPosicao).concat("/Base64");
    
  var result = this._httpClient.post<any>(url, body)
    .pipe(
      retry(0),
      catchError(this.handleError));

  return result;
}

postFotoUrl(fotos: any[]) {

  of(fotos).subscribe({
    next: result => {
      result.forEach(f => {
        var url = this.urlApi+'api/Produto/';
        url = url.concat(f.codProdutoEcommerce).concat("/Cor/").concat(f.codCor).concat("/Foto/").concat(f.posicao).concat("/Url");

        const body = {
          urlImagem: f.urlImagem,
        }

        console.log('postFotoUrl', url, body)

        // this._httpClient.post<any>(url, body)
        //   .pipe(
        //     retry(0),
        //     catchError(this.handleError))
        //   .subscribe();
      })
    }
  });
}

delFotoCor(codProduto: any, codCor: any, codPosicao: any) {
  var url = this.urlApi+'api/Produto/';
  url = url.concat(codProduto).concat("/Cor/").concat(codCor).concat("/Foto/").concat(codPosicao);

  console.log('delFotoCor',url)

  var result = this._httpClient.delete<any>(url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError));

  return result;  
}

getMarketplace(somenteAtivos: boolean = false) : Observable<any[]> {

  var url = this.urlApi+'api/ProvedorMarketplace';

  let parametros = new HttpParams();

  parametros = parametros.append('somenteAtivos', String(somenteAtivos));

  var result = this._httpClient.get<any[]>(url, { params: parametros })
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
    errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
  }
  console.error(errorMessage);
  alert(errorMessage);
  return throwError(errorMessage);
  //return errorMessage;
};


}



