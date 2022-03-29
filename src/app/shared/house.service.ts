import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { House } from "./house.model";

@Injectable({
    providedIn: 'root'
})
export class houseService {
    constructor(private http: HttpClient) { }

    postHouse(house: House) {
        return this.http.post(`${environment.serverURL}/api/Houses/NewHouse`, house, this.getOptions());
    }

    getHousesByUser(userID: number) {
        return this.http.get<House[]>(`${environment.serverURL}/api/Houses/getByUser/${userID}`, this.getOptions());
    }

    putHouse(house: House) {
        return this.http.put(`${environment.serverURL}/api/Houses/${house.id}`, house, this.getOptions());
    }

    getHouses() {
        return this.http.get<House[]>(`${environment.serverURL}/api/Houses`, this.getOptions());
    }

    deleteHouse(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Houses/${id}`, this.getOptions());
    }

    getHouse(id: number) {
        return this.http.get<House>(`${environment.serverURL}/api/Houses/byID/${id}`, this.getOptions())
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