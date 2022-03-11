import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Flat } from "./flat.model";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class flatService {
    constructor(private http: HttpClient) { }

    postFlat(flat: Flat) {
        return this.http.post(`${environment.serverURL}/api/Flats/NewFlat`, flat);
    }

    getFlatsByUser(userID: number) {
        const u = new User();
        u.id = userID;
        return this.http.post<Flat[]>(`${environment.serverURL}/api/Flats/getByUser`, u);
    }

    putFlat(flat: Flat) {
        return this.http.put(`${environment.serverURL}/api/Flats/${flat.id}`, flat);
    }

    getFlats() {
        return this.http.get<Flat[]>(`${environment.serverURL}/api/Flats`);
    }

    deleteFlat(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Flats/${id}`);
    }

    getFlat(id: number) {
        return this.http.get<Flat>(`${environment.serverURL}/api/Flats/${id}`);
    }
}