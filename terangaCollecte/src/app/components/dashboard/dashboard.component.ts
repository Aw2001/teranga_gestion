import { Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RecensementService } from '../../service/recensement.service';
import { ProprietaireService } from '../../service/proprietaire.service';
import { LocataireService } from '../../service/locataire.service';
import { RegionService } from '../../service/region.service';
import { DepartementService } from '../../service/departement.service';
import { CommuneService } from '../../service/commune.service';
import { SectionService } from '../../service/section.service';
import { ParcelleService } from '../../service/parcelle.service';
import { LocalService } from '../../service/local.service';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  recensementCount: number = 0;
  bienCount: number = 0;
  locataireCount: number = 0;
  proprietaireCount: number = 0;
  regions: any[] = [];
  departements: any[] = [];
  communes: any[] = [];
  sections: any[] = [];
  parcelles: any[] = [];
  selectedRegion: string = '';
  selectedDepartement: string = ''; 
  selectedCommune: string = ''; 
  selectedSection: string = '';
  selectedParcelle: string = '';
  userEmail: string = '';
  username: string = '';

  constructor(
    private userService: UtilisateurService,
    private jwtService: JwtService,
    private recensementService: RecensementService,
    private localService: LocalService,
    private proprietaireService: ProprietaireService,
    private locataireService: LocataireService,
    private regionService: RegionService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private sectionService: SectionService,
    private parcelleService: ParcelleService,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.loadScript('mapdata.js').then(() => {
      this.loadScript('countrymap.js');
    });
    this.recensementService.getRecensementCount().subscribe({
      next: (count) => this.recensementCount = count,
      error: () => this.recensementCount = 0
    });
    this.localService.getBienCount().subscribe({
      next: (count) => this.bienCount = count,
      error: () => this.bienCount = 0
    });
    this.proprietaireService.getProprietaireCount().subscribe({
      next: (count) => this.proprietaireCount = count,
      error: () => this.proprietaireCount = 0
    });
    this.locataireService.getLocataireCount().subscribe({
      next: (count) => this.locataireCount = count,
      error: () => this.locataireCount = 0
    });
    this.regionService.getAllRegions().subscribe({
      next: (regions) => {
        this.regions = regions;
        if (this.regions && this.regions.length > 0) {
          this.selectedRegion = this.regions[0].nom || this.regions[0];
          this.onRegionChange(this.selectedRegion);
        }
      },
      error: () => this.regions = []
    });

    
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

  onRegionChange(regionName: string) {
    this.selectedRegion = regionName;
    this.departementService.getAllDepartementsByRegion(regionName).subscribe({
      next: (departements) => {
        this.departements = departements;
        if (this.departements && this.departements.length > 0) {
          this.selectedDepartement = this.departements[0];
          this.onDepartementChange(this.selectedDepartement);
        } else {
          this.selectedDepartement = '';
          this.communes = [];
          this.sections = [];
          this.parcelles = [];
        }
      },
      error: (err) => {
        console.error('Erreur chargement départements:', err);
        this.departements = [];
        this.selectedDepartement = '';
        this.communes = [];
        this.sections = [];
        this.parcelles = [];
      }
    });
    console.log('Départements (après subscribe):', this.departements);
  }

  onDepartementChange(departementName: string) {
    this.selectedDepartement = departementName;
    this.communeService.getAllCommunesByDepartement(departementName).subscribe({
      next: (communes) => {
        this.communes = communes;
        if (this.communes && this.communes.length > 0) {
          this.selectedCommune = this.communes[0];
          this.onCommuneChange(this.selectedCommune);
        } else {
          this.selectedCommune = '';
          this.sections = [];
          this.parcelles = [];
        }
      },
      error: (err) => {
        console.error('Erreur chargement communes:', err);
        this.communes = [];
        this.selectedCommune = '';
        this.sections = [];
        this.parcelles = [];
      }
    });
    console.log('Communes (après subscribe):', this.communes);
  }

  onCommuneChange(commune: string) {
    this.selectedCommune = commune;
    this.sectionService.getAllSectionsByCommune(commune).subscribe({
      next: (sections) => {
        this.sections = sections;
        if (this.sections && this.sections.length > 0) {
          this.selectedSection = this.sections[0];
          this.onSectionChange(this.selectedSection);
        } else {
          this.selectedSection = '';
          this.parcelles = [];
        }
      },
      error: (err) => {
        console.error('Erreur chargement sections:', err);
        this.sections = [];
        this.selectedSection = '';
        this.parcelles = [];
      }
    });
    console.log('Sections (après subscribe):', this.sections);
  }

  onSectionChange(sectionNumSec: string) {
    this.selectedSection = sectionNumSec;
    this.parcelleService.getAllParcellesBySection(sectionNumSec, this.selectedRegion, this.selectedDepartement, this.selectedCommune).subscribe({
      next: (parcelles) => {
        
        this.parcelles = parcelles;
      },
      error: (err) => {
        console.error('Erreur chargement parcelles:', err);
        this.parcelles = [];
      }
    });
    console.log('Parcelles (après subscribe):', this.parcelles);
  }

  onParcelleChange(parcelle: string) {
    this.selectedParcelle = parcelle;
  }

  goToLocauxParcelle() {
    if (this.selectedParcelle) {
      this.router.navigate(['/locaux', this.selectedParcelle]);
    } else {
      alert('Veuillez sélectionner une parcelle avant de continuer.');
    }
  }

  isSidebarActive: boolean = false;
 

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = () => reject();
      document.body.appendChild(scriptElement);
    });
  }

  
  
}
