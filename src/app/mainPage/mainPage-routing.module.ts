import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnlyLoggedInUsersGuard } from "../shared/guards/OnlyLoggedInUsers.guard";
import { MainPageComponent } from "./mainPage.component";

const routes: Routes = [

    {
        path: '', component: MainPageComponent,
        children: [
            { path: '', redirectTo: 'houses-list', pathMatch: 'full' },
            { path: 'houses-list', loadChildren: () => import("./componentsForEditing/house/house.module").then(m => m.HouseModule) },
            { path: 'flats-list/:id', loadChildren: () => import("./componentsForEditing/flat/flat.module").then(m => m.FlatModule) },
            { path: 'tenants-list/:id', loadChildren: () => import("./componentsForEditing/tenant/tenant.module").then(m => m.TenantModule) },
        ],
        canActivate: [OnlyLoggedInUsersGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EditPlaceRoutingModule { }