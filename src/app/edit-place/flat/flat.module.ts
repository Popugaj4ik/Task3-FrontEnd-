import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

import { FlatFormComponent } from "./flat-form/flat-form.components";
import { FlatRoutingModule } from "./flat-routing.module";
import { FlatComponent } from "./flat.component";

@NgModule({
    imports: [
        CommonModule,
        FlatRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule
    ],
    exports: [],
    declarations: [
        FlatComponent,
        FlatFormComponent
    ]
})
export class FlatModule { }