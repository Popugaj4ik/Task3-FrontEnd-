import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HouseComponent } from "./house.component";

const routes: Routes = [
    { path: '', component: HouseComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class HouseRoutingModule { }