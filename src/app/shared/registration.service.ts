import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { User } from "./user.model";
import { UserDTO } from "./DTO/userDTO.model";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post<UserDTO>(`${environment.serverURL}/api/auth/registerUser`, user);
    }
}