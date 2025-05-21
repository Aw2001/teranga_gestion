import { Component } from '@angular/core';

@Component({
  selector: 'app-parametres',
  imports: [],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss'
})
export class ParametresComponent {

  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
