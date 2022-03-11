import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalVariables } from "../global.variable";
import { LoginRegisterService } from "../LoginRegister.servise";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private auth: LoginRegisterService,
        private router: Router
        ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        
        console.log("AlwaysAuthGuard");

        return true;
    }
    
    
}