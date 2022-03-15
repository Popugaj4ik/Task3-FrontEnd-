import { Component, OnInit } from '@angular/core';
import { SidenavService } from "src/app/shared/sidenav.service";

@Component({
  selector: 'edit-place-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public service: SidenavService) { }

  ngOnInit(): void {
  }

}
