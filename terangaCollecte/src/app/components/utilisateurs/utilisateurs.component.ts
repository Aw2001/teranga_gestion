import { Component } from '@angular/core';

@Component({
  selector: 'app-utilisateurs',
  imports: [],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {

  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
