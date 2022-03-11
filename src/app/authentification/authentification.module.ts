import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AuthentificationRoutingModule } from "./authentification-routing.module";
import { AuthentificationComponent } from "./authentification.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthentificationRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    exports: [],
    declarations: [
        AuthentificationComponent
    ]
})
export class AuthentificationModule { }