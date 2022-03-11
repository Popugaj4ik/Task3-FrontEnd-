import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/guard.service";
import { OnlyLoggedInUsersGuard } from "../shared/guards/OnlyLoggedInUsers.guard";
import { EditPlaceComponent } from "./edit-place.component";

const routes: Routes = [

    {
        path: '', component: EditPlaceComponent,
        children: [
            { path: '', redirectTo: 'houses-list', pathMatch: 'full' },
            { path: 'houses-list', loadChildren: () => import("./house/house.module").then(m => m.HouseModule) },
            { path: 'flats-list/:id', loadChildren: () => import("./flat/flat.module").then(m => m.FlatModule) },
            { path: 'tenants-list/:id', loadChildren: () => import("./tenant/tenant.module").then(m => m.TenantModule) },
        ],
        canActivate: [AuthGuard, OnlyLoggedInUsersGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EditPlaceRoutingModule { }