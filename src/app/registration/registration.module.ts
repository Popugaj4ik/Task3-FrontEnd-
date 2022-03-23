import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { JwtSubModule } from "../shared/Jwt.module";

import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./registration.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegistrationRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        JwtSubModule
    ],
    exports: [],
    declarations: [
        RegistrationComponent
    ]
})
export class RegistrationModule { }