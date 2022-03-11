import { Injectable, NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { EditPlaceRoutingModule } from './edit-place-routing.module';
import { EditPlaceComponent } from './edit-place.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthGuard } from '../shared/guards/guard.service';
import { OnlyLoggedInUsersGuard } from '../shared/guards/OnlyLoggedInUsers.guard';

@NgModule({
    declarations: [
        EditPlaceComponent,
        SidenavComponent,
        ToolbarComponent
    ],
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        EditPlaceRoutingModule
    ],
    providers: [AuthGuard, OnlyLoggedInUsersGuard]
})
@Injectable({
    providedIn: 'root'
})
export class EditPlaceModule { }