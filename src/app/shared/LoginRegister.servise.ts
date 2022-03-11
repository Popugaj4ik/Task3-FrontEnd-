import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { GlobalVariables } from "./global.variable";

import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class LoginRegisterService {
    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post(`${environment.serverURL}/api/Users/register`, user);
    }

    loginUser(user: User) {
        return this.http.post(`${environment.serverURL}/api/Users/login`, user);
    }

    putUser(user: User) {
        return this.http.put(`${environment.serverURL}/api/Users`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Users/${id}`);
    }

    getUsers() {
        return this.http.get<User[]>(`${environment.serverURL}/api/Users`);
    }

    getUser(id: number) {
        return this.http.get<User>(`${environment.serverURL}/api/Users/${id}`);
    }

    

    HashPassword(password: String) {
        const xorKey = 73;
        var result = "";
        for (var i = 0; i < password.length; i++) {
            result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
        }
        return result
    }
}