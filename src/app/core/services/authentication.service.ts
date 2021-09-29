import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../modules/user';
import { AppConfigurarion } from '@app/_config/app-configuration';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }

    constructor(private http: HttpClient, private _appConfig: AppConfigurarion) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get apiUrl_auth() {
        return this._appConfig.apiUrl_auth;
    }  

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {

        const resquest = {
            app_id: "APP_MARKETPLACE_WEB",
            app_secret: "QVBQX01BUktFVFBMQUNFX1dFQg==",
            login: email,
            password: password,
            audience: "http://localhost:30933/Marketplace"
        }

        const body = JSON.stringify(resquest);
 
        return this.http.post<any>(this.apiUrl_auth, body, this.httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }))

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        const userLocal: any = null;
        this.currentUserSubject.next(userLocal);
    }
}