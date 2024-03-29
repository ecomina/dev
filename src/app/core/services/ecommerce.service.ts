import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseFilter } from '@app/modules/BaseFilter';
import { BasePaginacao } from '@app/modules/BasePaginacao';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { AppConfigurarion } from '@app/_config/app-configuration';
import { environment } from '@environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService extends BaseComponent {

  get urlApi() {
    return environment.API_URL;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  constructor(
    private _httpClient: HttpClient,
    private _appConfig: AppConfigurarion,
    private domSanitizer: DomSanitizer) { 
      super()
  }

  getProduto(filtros: BaseFilter[], paginacao: BasePaginacao) {

    localStorage.setItem('produtoUltimoFiltro', JSON.stringify(filtros))

    var url = this.urlApi+'api/Produto';

    let parametros = new HttpParams();

    if (paginacao.TamanhoDaPagina != undefined)
      parametros = parametros.append('tamanhoDaPagina', String(paginacao.TamanhoDaPagina))

    if (paginacao.Pagina != undefined)
      parametros = parametros.append('pagina', String(paginacao.Pagina))

    filtros.forEach(f => {
      if (f.Param1 != null)
      {
        parametros = parametros.append(f.Param1, String(f.Value1))
      }
      
      if (f.Param2 != null)
      {
        parametros = parametros.append(f.Param2, String(f.Value2))
      }
    })
    
    var result = this._httpClient.get<any>(url, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response' as 'response', params: parametros})
      .pipe(
        retry(0),
        catchError(this.handleError))

    return result;
  }

  getProdutoCodigo(codigo: any) {
    console.log('cores', codigo)

    var url = this.urlApi+'api/Produto/';

    let parametros = new HttpParams();

    parametros = parametros.append('codigo', String(codigo));

    var result = this._httpClient.get<any>(url.concat(codigo))
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getProdutoFiltros(codigo: any) : Observable<any[]> {

    var url = this.urlApi+'api/Produto/';

    url = url.concat(codigo)+"/Filtros"

    var result = this._httpClient.get<any>(url)
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getProdutoFiltrosCodigo(codProduto: any, codFiltro: any) : Observable<any> {

    var url = this.urlApi+'api/Produto/';

    url = url.concat(codProduto)+"/Filtros/"
    url = url.concat(codFiltro);

    var result = this._httpClient.get<any>(url)
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

  putProduto(codigo: any, obj: any) : Observable<any> {

    var url = this.urlApi+'api/Produto/';

    const body = JSON.stringify(obj);

    var result = this._httpClient.put<any>(url.concat(codigo), body, this.httpOptions)
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

  getCategoriaCodigo(codigo: any) : Observable<any[]> {

    var url = this.urlApi+'api/Categoria/';

    let parametros = new HttpParams();

    parametros = parametros.append('codigo', String(codigo));

    var result = this._httpClient.get<any>(url.concat(codigo))
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getCategoriaProvedor(codProvedorMarketplace: any, categoriaPai: any = null) : Observable<any[]> {

    var url = this.urlApi+'api/Categoria/Provedor/';
    url = url.concat(codProvedorMarketplace);

    let parametros = new HttpParams();

    if (categoriaPai != null)
      parametros = parametros.append('idCategoriaPai', String(categoriaPai));

    var result = this._httpClient.get<any>(url, {params: parametros})
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

  getFiltroCodigo(codigo: any) {
    
    var url = this.urlApi+'api/Filtro/';

    let parametros = new HttpParams();

    parametros = parametros.append('codigo', String(codigo));

    var result = this._httpClient.get<any>(url.concat(codigo))
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getFiltroProvedor(codProvedorMarketplace: any) : Observable<any[]> {
    var url = this.urlApi+'api/Filtro/Provedor/';
    
    var result = this._httpClient.get<any>(url.concat(codProvedorMarketplace))
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getFiltroProvedorCategorias(codProvedorMarketplace: any, categorias: any[]) : Observable<any[]> {
    var url = this.urlApi+'api/Filtro/Provedor/';

    let parametros = new HttpParams();
    
    categorias.forEach(c => {
      parametros = parametros.append('codCategorias', String(c));
    })
    
    var result = this._httpClient.get<any>(url.concat(codProvedorMarketplace), {params: parametros})
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  salvarFiltro(obj: any, novo: boolean) : Observable<any> {
    if (novo)
      return this.postFiltro(obj);
    else
      return this.putFiltro(obj)
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

  putFiltro(obj: any) : Observable<any> {

    var url = this.urlApi+'api/Filtro';

    let parametros = new HttpParams();
    parametros = parametros.append('codigo', String(obj.codigo));

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
          const body = JSON.stringify({ urlImagem: f.urlImagem })

          this._httpClient.post<any>(url, body, this.httpOptions)
            .pipe(
              retry(1),
              // catchError(this.handleError)
            )
            .subscribe({
              next: result => {
                console.log(result)
              },
              error: erro => {
                console.error(erro);
              }
              
            })

        })
      }
    });
  }

  delFotoCor(codProduto: any, codCor: any, codPosicao: any) {
    var url = this.urlApi+'api/Produto/';
    url = url.concat(codProduto).concat("/Cor/").concat(codCor).concat("/Foto/").concat(codPosicao);
    
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

  getPedidos(filtros: BaseFilter[]) {

    var url = this.urlApi+'api/Pedido';

    let parametros = new HttpParams();

    filtros.forEach(f => {
      
      if (f.Param1 != null)
        parametros.append(f.Param1, String(f.Value1))
      
      if (f.Param2 != null)
        parametros.append(f.Param2, String(f.Value2))
    })
    console.log('Pedidos', url, parametros)
    var result = this._httpClient.get<any[]>(url, { params: parametros })
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;

  }

  getPedidoCodigo(codigo: any) {
    var url = this.urlApi+'api/Pedido/';

    let parametros = new HttpParams();

    parametros = parametros.append('codigo', String(codigo));

    var result = this._httpClient.get<any>(url.concat(codigo))
      .pipe(
        retry(0),
        catchError(this.handleError));

    return result;
  }

  getMarketplaces(somenteAtivos: boolean = false) : Observable<any[]> {

    var url = this.urlApi+'api/ProvedorMarketplace';

    let parametros = new HttpParams();

    parametros.append('somenteAtivos', String(somenteAtivos))

    var result = this._httpClient.get<any[]>(url, {params: parametros})
      .pipe(
        retry(1),
        catchError(this.handleError));

    return result;
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = `Err ${error.error.message}`;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.error.message}`;
    }
    console.error(error);
    alert(errorMessage);
    return throwError(errorMessage);
    //return errorMessage;
  };

}



