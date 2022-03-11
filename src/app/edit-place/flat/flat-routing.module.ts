import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FlatComponent } from "./flat.component";

const routes: Routes = [
    { path: '', component: FlatComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class FlatRoutingModule { }