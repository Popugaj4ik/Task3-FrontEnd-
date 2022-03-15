import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { GlobalVariables } from "../global.variable";

export class OnlyLoggedInUsersGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log("OnlyLoggedInUsersGuard");
        console.log(route);
        if (GlobalVariables.isLoggedIn) {
            return true;
        }
        else {
            
            return false;
        }
    }
}