import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

import { TenantFormComponent } from "./tenant-form/tenant-form.component";
import { TenantRoutingModule } from "./tenant-routing.module";
import { TenantComponent } from "./tenant.component";

@NgModule({
    imports: [
        CommonModule,
        TenantRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule
    ],
    exports: [],
    declarations: [
        TenantComponent,
        TenantFormComponent
    ]
})
export class TenantModule { }