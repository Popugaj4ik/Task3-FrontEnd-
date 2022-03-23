import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [environment.serverDomain],
                disallowedRoutes: []
            }
        })
    ],
    exports:[JwtModule]
})
export class JwtSubModule { }