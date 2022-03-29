import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Token } from "./token.module";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor(private http: HttpClient) { }

    refreshToken() {
        return this.http.get<Token>(`${environment.serverURL}/api/auth/refreshToken`, this.getOptions());
    }

    private getOptions() {
        var token = localStorage.getItem(environment.jwt);

        var headers = new HttpHeaders().set("Authorization", "Bearer " + token);

        var options = {
            headers: headers
        }

        return options;
    }
}