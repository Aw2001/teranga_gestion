import { Component } from '@angular/core';

@Component({
  selector: 'app-proprietaires',
  imports: [],
  templateUrl: './proprietaires.component.html',
  styleUrl: './proprietaires.component.scss'
})
export class ProprietairesComponent {
  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
