import { Component } from '@angular/core';

@Component({
  selector: 'app-locataires',
  imports: [],
  templateUrl: './locataires.component.html',
  styleUrl: './locataires.component.scss'
})
export class LocatairesComponent {
  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
