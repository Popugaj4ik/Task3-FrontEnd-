import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { House } from "./house.model";

@Injectable({
    providedIn: 'root'
})
export class houseService {
    constructor(private http: HttpClient) { }

    postHouse(house: House) {
        return this.http.post(`${environment.serverURL}/api/Houses/NewHouse`, house);
    }

    getHousesByUser(userID: number) {
        return this.http.get<House[]>(`${environment.serverURL}/api/Houses/getByUser/${userID}`);
    }

    putHouse(house: House) {
        return this.http.put(`${environment.serverURL}/api/Houses/${house.id}`, house);
    }

    getHouses() {
        return this.http.get<House[]>(`${environment.serverURL}/api/Houses`);
    }

    deleteHouse(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Houses/${id}`);
    }

    getHouse(id: number) {
        return this.http.get<House>(`${environment.serverURL}/api/Houses/byID${id}`)
    }
}