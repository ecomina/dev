import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { AppConfigurarion } from "./app-configuration";

@Injectable({
    providedIn: 'root'
})
export class AppConfigurarionJsonService extends AppConfigurarion {
    constructor(private http: HttpClient) {
        super();
    }

    load() {
        return this.http.get<AppConfigurarion>('app.config.json')
        .toPromise()
        .then(data => {
            environment.API_URL = data.apiUrl;
            environment.API_URL_Auth = data.apiUrl_auth;

            this.apiUrl = data.apiUrl;
            this.apiUrl_auth = data.apiUrl_auth;
            this.path_fotos = data.path_fotos;
        })
        .catch(() => {
            console.error('Não foi possivel ler o arquivo de configuração');
        })
    }
}