import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageUtils } from '../utils/localstorage.utils';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private localStorageUtils: LocalStorageUtils) { }

    authenticate(email: string, password: string): Observable<any> {
        const authData = btoa(`${email}:${password}`);
        const headers = new HttpHeaders({
            'Authorization': `Basic ${authData}`
        });
        return this.http.post(`${this.apiUrl}/authenticate`, null, { headers });
    }

    isAuthenticated(): boolean {
        return this.localStorageUtils.getToken() !== null && this.localStorageUtils.getUserId() !== null;
    }

}