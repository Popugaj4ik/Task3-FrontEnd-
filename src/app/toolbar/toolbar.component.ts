import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public service: SidenavService) { }

  ngOnInit(): void {
  }

  onToggle() {
    this.service.togle = !this.service.togle;
  }
}
