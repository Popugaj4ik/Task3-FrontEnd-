import { Injectable, NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { EditPlaceRoutingModule } from './mainPage-routing.module';
import { MainPageComponent } from './mainPage.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OnlyLoggedInUsersGuard } from '../shared/guards/OnlyLoggedInUsers.guard';
import { JwtSubModule } from '../shared/Jwt.module';

@NgModule({
    declarations: [
        MainPageComponent,
        SidenavComponent,
        ToolbarComponent
    ],
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        EditPlaceRoutingModule,
        JwtSubModule
    ],
    providers: [OnlyLoggedInUsersGuard]
})
@Injectable({
    providedIn: 'root'
})
export class MainPageModule { }