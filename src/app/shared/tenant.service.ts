import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { Tenant } from "./tenant.model";
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class tenantService {
    constructor(private http: HttpClient) { }

    postTenant(tenant: Tenant) {
        return this.http.post(`${environment.serverURL}/api/Tenants/NewTenant`, tenant);
    }

    getTenantsByUser(userID: number){
        const u = new User();
        u.id = userID;
        return this.http.post<Tenant[]>(`${environment.serverURL}/api/Tenants/getByUser`, u);
    }

    putTenant(tenant: Tenant) {
        return this.http.put(`${environment.serverURL}/api/Tenants/${tenant.id}`, tenant);
    }

    getTenants() {
        return this.http.get<Tenant[]>(`${environment.serverURL}/api/Tenants`);
    }

    deleteTenant(id: number) {
        return this.http.delete(`${environment.serverURL}/api/Tenants/${id}`);
    }

    getTenant(id: number) {
        return this.http.get<Tenant>(`${environment.serverURL}/api/Tenants/${id}`);
    }
}