import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-utilisateurs',
  imports: [],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {

  isSidebarActive: boolean = false;

  constructor(private userService: UtilisateurService) { }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
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
