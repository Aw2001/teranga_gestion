import { Component } from '@angular/core';
import { RecensementService } from '../../service/recensement.service';
import { CommonModule } from '@angular/common';
import { AddRecensementModalComponent } from './add-recensement-modal/add-recensement-modal.component';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-recensements',
  imports: [CommonModule, AddRecensementModalComponent],
  templateUrl: './recensements.component.html',
  styleUrl: './recensements.component.scss'
})
export class RecensementsComponent {
  recensements: any[] = [];
  isSidebarActive: boolean = false;
  showAddModal: boolean = false;

  constructor(private recensementService: RecensementService, private userService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadRecensements();
  }

  loadRecensements() {
    this.recensementService.getAllRecensements().subscribe({
      next: (data) => {
        this.recensements = data;
        console.log('Recensements chargés:', this.recensements);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recensements:', error);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onRecensementAdded(newRecensement: any) {
    this.recensements.push(newRecensement);
  }
  logout(): void {
    let email = '';
    const user = localStorage.getItem('user');
    if (user) {
      try {
        email = JSON.parse(user).email || '';
      } catch {
        email = '';
      }
    }

    // Importer Router depuis le constructeur
    const cleanUpAndRedirect = () => {
      // Effacer toutes les données d'authentification
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('user');
      
      // Utiliser le Router d'Angular au lieu de location.replace
      // Cela garantit que le système de routage d'Angular est utilisé correctement
      window.location.href = '/login';
      
      // Empêcher la navigation arrière après déconnexion
      window.history.pushState(null, '', '/login');
    };

    if (email) {
      this.userService.logout(email).subscribe({
        next: cleanUpAndRedirect,
        error: (err: any) => {
          console.error('Erreur lors de la déconnexion:', err);
          cleanUpAndRedirect();
        }
      });
    } else {
      cleanUpAndRedirect();
    }
}
}
