import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor(private http: HttpClient) { }

    refreshToken() {
        return this.http.get<string>(`${environment.serverURL}/api/auth/refreshToken`);
    }
}