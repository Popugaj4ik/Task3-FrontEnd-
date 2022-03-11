import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'authentification', loadChildren: () => import("./authentification/authentification.module").then(m => m.AuthentificationModule) },
    { path: 'edit-list/:username', loadChildren: () => import("./edit-place/edit-place.module").then(m => m.EditPlaceModule) },
    { path: 'regstration', loadChildren: () => import("./registration/registration.module").then(m => m.RegistrationModule) },
    { path: '', redirectTo: '/authentification', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }