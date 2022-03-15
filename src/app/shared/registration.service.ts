import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post(`${environment.serverURL}/api/Users/register`, user);
    }
}