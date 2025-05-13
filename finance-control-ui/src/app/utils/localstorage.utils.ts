import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageUtils {

    private XTOKEN: string = "x-token";
    private XUSERID: string = "x-userId";

    getToken(): string | null {
        return localStorage.getItem(this.XTOKEN);
    }

    getUserId(): string | null {
        return localStorage.getItem(this.XUSERID);
    }

    setToken(token: string): void {
        localStorage.setItem(this.XTOKEN, token);
    }

    setUserId(userId: string): void {
        localStorage.setItem(this.XUSERID, userId);
    }

    removerCredentials(): void {
        localStorage.removeItem(this.XTOKEN);
        localStorage.removeItem(this.XUSERID);
    }

}