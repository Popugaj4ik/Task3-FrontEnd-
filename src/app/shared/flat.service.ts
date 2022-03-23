import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { Flat } from "./flat.model";

@Injectable({
    providedIn: 'root'
})
export class flatService {
    constructor(private http: HttpClient) { }

    postFlat(flat: Flat) {
        return this.http.post(`${environment.serverURL}/api/Flats/NewFlat`, flat, this.getOptions());
    }

    getFlatsByUser(userID: number) {
        return this.http.get<Flat[]>(`${environment.serverURL}/api/Flats/getByUser/${userID}`, this.getOptions());
    }

    putFlat(flat: Flat) {
        return this.http.put(`${environment.serverURL}/api/Flats/${flat.id}`, flat, this.getOptions());
    }

    getFlats() {
        return this.http.get<Flat[]>(`${environment.serverURL}/api/Flats`, this.getOptions());
    }

    deleteFlat(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Flats/${id}`, this.getOptions());
    }

    getFlat(id: number) {
        return this.http.get<Flat>(`${environment.serverURL}/api/Flats/byID/${id}`, this.getOptions());
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