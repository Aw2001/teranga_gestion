import { Component } from '@angular/core';
import { LocalService } from '../../service/local.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-locaux',
  imports: [CommonModule],
  templateUrl: './locaux.component.html',
  styleUrl: './locaux.component.scss'
})
export class LocauxComponent {

  isSidebarActive: boolean = false;
  locaux: any[] = [];
  nicad: string | null = null;
 
  
  constructor(private localService: LocalService, private route: ActivatedRoute, private userService: UtilisateurService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nicad = params.get('nicad');
      this.loadBiens(this.nicad);
    });
  }

  loadBiens(nicad?: string | null): void {
    if (nicad) {
      // Appeler le service pour charger les locaux de la parcelle nicad
      this.localService.getAllBiensByNicad(nicad).subscribe(
        (data) => {
          this.locaux = data;
          console.log(this.locaux);
        },
        (error) => {
          console.error('Erreur lors de la récupération des locaux pour la parcelle', nicad, error);
        }
      );
    } else {
      // Charger tous les locaux
      this.localService.getAllBiens().subscribe(
        (data) => {
          this.locaux = data;
          console.log(this.locaux);
        },
        (error) => {
          console.error('Erreur lors de la récupération des locaux', error);
        }
      );
    }
  }

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

    const cleanUpAndRedirect = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('user');
      location.replace('/login');
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
