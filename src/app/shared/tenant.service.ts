import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { Tenant } from "./tenant.model";

@Injectable({
    providedIn: 'root'
})
export class tenantService {
    constructor(private http: HttpClient) { }

    postTenant(tenant: Tenant) {
        return this.http.post(`${environment.serverURL}/api/Tenants/NewTenant`, tenant, this.getOptions());
    }

    getTenantsByUser(userID: number) {
        return this.http.get<Tenant[]>(`${environment.serverURL}/api/Tenants/getByUser/${userID}`, this.getOptions());
    }

    putTenant(tenant: Tenant) {
        return this.http.put(`${environment.serverURL}/api/Tenants/${tenant.id}`, tenant, this.getOptions());
    }

    getTenants() {
        return this.http.get<Tenant[]>(`${environment.serverURL}/api/Tenants`, this.getOptions());
    }

    deleteTenant(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Tenants/${id}`, this.getOptions());
    }

    getTenant(id: number) {
        return this.http.get<Tenant>(`${environment.serverURL}/api/Tenants/byID/${id}`, this.getOptions());
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