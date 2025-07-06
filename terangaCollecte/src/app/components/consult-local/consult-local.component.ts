import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../../service/local.service';
import { UtilisateurService } from '../../service/utilisateur.service';
import { ImageService } from '../../service/image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consult-local',
  templateUrl: './consult-local.component.html',
  styleUrls: ['./consult-local.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ConsultLocalComponent implements OnInit {
  localId: string | null = null;
  local: any = null;
  isSidebarActive = false;
  selectedFiles: { file: File; preview: string }[] = [];
  images: string[] = []; // Ajout pour stocker les images du bien

  constructor(private route: ActivatedRoute, private localService: LocalService, private userService: UtilisateurService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.localId = this.route.snapshot.paramMap.get('id');
    if (this.localId) {
      this.localService.getBienById(this.localId).subscribe({
        next: (data) => {
          this.local = data;
          // Charger les images du bien après avoir chargé le bien
          this.loadImages(this.localId!);
        },
        error: (err) => {
          console.error('Erreur lors du chargement du local :', err);
          this.local = null;
        }
      });
    }
  }

  loadImages(idBien: string) {
    this.imageService.returnImage(idBien).subscribe({
      next: (response) => {
        // On suppose que response est une liste d'objets image avec un champ imageData
        if (Array.isArray(response)) {
          this.images = response.map((img: any) => `data:image/jpeg;base64,${img.imageData}`);
        } else {
          this.images = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des images :', err);
        this.images = [];
      }
    });
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

