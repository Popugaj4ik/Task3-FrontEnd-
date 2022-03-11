import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

import { HouseFormComponent } from "./house-form/house-form.component";
import { HouseRoutingModule } from "./house-routing.module";
import { HouseComponent } from "./house.component";

@NgModule({
    imports: [
        CommonModule,
        HouseRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule
    ],
    exports: [],
    declarations: [
        HouseComponent,
        HouseFormComponent
    ]
})
export class HouseModule { }