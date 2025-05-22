import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { StorageService } from "../../shared/services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    private _htpp = inject(HttpClient);
    private _storage = inject(StorageService);

    login(email: string, password:string): Observable<any> {
        return this._htpp.post(`${environment.API_URL}/auth/login`, {
            email,
            password
        }).pipe(tap((res) => {
            this._storage.set('session', JSON.stringify(res))
        }));
    }

    signUp(name: string, email: string, password:string): Observable<any> {
        return this._htpp.post(`${environment.API_URL}/auth/signup`, {
            name,
            email,
            password
        }).pipe(tap((res) => {
            this._storage.set('session', JSON.stringify(res));
        }));
    }
}