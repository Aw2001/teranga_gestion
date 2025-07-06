import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../service/utilisateur.service';
import { ProprietaireService } from '../../service/proprietaire.service';
import { SectionService } from '../../service/section.service';
import { ParcelleService } from '../../service/parcelle.service';
import { DepartementService } from '../../service/departement.service';
import { CommuneService } from '../../service/commune.service';
import { LocalService } from '../../service/local.service';
import { ImageService } from '../../service/image.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-bien-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bien-form.component.html',
  styleUrls: ['./bien-form.component.scss']
})
export class BienFormComponent implements OnInit {
  bienForm: FormGroup;
  selectedFiles: { file: File; preview: string }[] = [];
  isSidebarActive: boolean = false;
  departements: any[] = [];
  communes: any[] = [];
  sections: any[] = [];
  nicads: any[] = [];
  proprietaires: any[] = [];
  // Options pour les dropdowns
  typeParcelleOptions = [
    'Usage scolaire',
    'Usage médical',
    'Usage religieux',
    'Service public',
    'Distribution en eau',
    'Distribution en électricité',
    'Bâtiment en chantier',
    'Parcelle elligible',
    'Terrain nu sans activité',
    'Terrain nu à usage commercial',
    'Terrain nu à usage industriel',
    'Autre'
  ];

  // Options supplémentaires
  regions = ['Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor'];

  typeVoirieOptions = ['Rue', 'Boulevard', 'Allée', 'Avenue', 'Rocade', 'Autre'];
  usageOptions = ['Résidentiel', 'Commercial', 'Mixte'];
  typeClotureOptions = ['Mur', 'Mur avec fer forgé', 'Grillage', 'Absence'];
  etatClotureOptions = ['Très Bon', 'Bon', 'Moyen', 'Mauvais'];
  toitureOptions = ['Tuile', 'Fibrociment', 'Tôle galvanisée'];
  typeRevetementOptions = [
    'Carrelage',
    'Pierre',
    'Enduit simple',
    'Enduit wis',
    'Peinture',
    'Absence'
  ];
  typeCarrelageOptions = [
    'Marbre',
    'Granite',
    'Grès poli',
    'Grès cérame de 1er choix',
    'Grès cérame de 2ème choix',
    'Grès émaillé de 1er choix',
    'Grès émaillé de 2ème choix',
    'Aucun'
  ];

  menuiserieOptions = [
    'Aluminium',
    'Bois noble',
    'Bois fraké ou similaire',
    'Bois isoplane',
    'Fer forgé'
  ];

  conceptionPiecesOptions = [
    'Large',
    'Moyenne',
    'Petite'
  ];

  appareilsSanitairesOptions = [
    'Aluminium',
    'Haute gamme',
    'Gamme moyenne',
    'Qualité ordinaire'
  ];

  parkingInterieurOptions = [
    'Couvert',
    'Non couvert',
    'Aucun'
  ];

  confortOptions = [
    'Très grand confort',
    'Grand confort',
    'Pas de confort'
  ];

  etatRevetementOptions = [
    'Très bon',
    'Bon',
    'Moyen',
    'Mauvais',
    'Standard'
  ];

  situationRouteOptions = [
    'Loin de la route principale',
    'Proche de la route principale',
    'Sur la route principale'
  ];

  typeRouteOptions = [
    'Goudron',
    'Graviers',
    'Pas de voirie',
    'Pavés',
    'Sable'
  ];

  garageOptions = [
    'Simple',
    'Double',
    'Multiple',
    'Absence'
  ];

  qualitePFOptions = [
    'Très bonne',
    'Bonne',
    'Moyenne',
    'Mauvaise',
    'Standard'
  ];

  localisationLotOptions = [
    'Gauche',
    'Droite',
    'Centre',
    'Tout le niveau'
  ];

  situationLotOptions = [
    'Totalité d\'un bâtiment',
    'Partie du bâtiment',
    'Totalité des bâtiments'
  ];

  typeLotOptions = [
    'Maison individuelle',
    'Immeuble collectif',
    'Copropriété'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UtilisateurService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private proprietaireService: ProprietaireService,
    private parcelleService: ParcelleService,
    private sectionService: SectionService,
    private localService: LocalService,
    private imageService: ImageService
  ) {
    this.bienForm = this.fb.group({
      identifiant: [''],
      superficie: [''],
      proprieteEnLocation: [''],
      adresse: [''],
      quartier: [''],
      village: [''],
      numPorteAdm: [''],
      codeDeRueAdm: [''],
      nomRue: [''],
      typeLot: [''],
      niveauLot: [''],
      localisationLot: [''],
      situationLot: [''],
      numLot: [''],
      valeurLocativeAnnuelle: [''],
      valeurLocativeAnnuelleSaisie: [''],
      numTitreFoncier: [''],
      dateAcquisition: [''],
      typeOccupation: [''],
      autreTypeOccupation: [''],
      dateDelivranceTypeOccupation: [''],
      usagee: [''],
      numCompteurSde: [''],
      numCompteurSenelec: [''],
      typeConstruction: [''],
      toiture: [''],
      typeCloture: [''],
      etatCloture: [''],
      typeRevetement: [''],
      etatRevetement: [''],
      situationRoute: [''],
      typeRoute: [''],
      garage: [''],
      qualitePorteFenetre: [''],
      typeCarrelage: [''],
      menuiserie: [''],
      conceptionPieces: [''],
      appareilsSanitaires: [''],
      parkingInterieur: [''],
      nbAscenseurs: [''],
      nbSalleBain: [''],
      nbSalleEau: [''],
      nbPieceReception: [''],
      nbTotalPiece: [''],
      nbEtage: [''],
      confort: [''],
      valeurLocativeMensuelle: [''],
      valeurLocativeMensuelleSaisie: [''],
      escalier: [''],
      videOrdure: [''],
      monteCharge: [''],
      groupeElectrogene: [''],
      dependanceIsolee: [''],
      garageSouterrain: [''],
      systemeClimatisation: [''],
      systemeDomotique: [''],
      balcon: [''],
      terrasse: [''],
      systemeSurveillance: [''],
      amenagementPaysager: [''],
      jardin: [''],
      piscine: [''],
      coursDeTennis: [''],
      coursGazonnee: [''],
      terrainGolf: [''],
      autre: [''],
      angle: [''],
      eclairagePublic: [''],
      murEnCiment: [''],
      attributsArchitecturaux: [''],
      trottoir: [''],
      nomVoirie: [''],
      typeVoirie: [''],
      nomAutreVoirie: [''],
      typeParcelle: [''],
      commentaire: [''],
      idProprietaire: [''],
      idParcelle: [''],
      region: [''],
      departement: [''],
      commune: [''],
      section: [''],
    });
  }

  ngOnInit(): void {
    this.loadProprietaires();
    // Déclenche automatiquement le chargement des départements quand la région change
    this.bienForm.get('region')?.valueChanges.subscribe(region => {
      if (region) {
        this.loadDepartements();
      } else {
        this.departements = [];
        this.bienForm.get('departement')?.setValue('');
      }
      this.genererIdentifiantAuto();
    });

    // Déclenche automatiquement le chargement des communes quand le département change
    this.bienForm.get('departement')?.valueChanges.subscribe(departement => {
      if (departement) {
        this.loadCommunes();
      } else {
        this.communes = [];
        this.bienForm.get('commune')?.setValue('');
      }
      this.genererIdentifiantAuto();
    });
    
    // Déclenche automatiquement le chargement des sections quand la commune change
    this.bienForm.get('commune')?.valueChanges.subscribe(commune => {
      if (commune) {
        this.loadSections();
      } else {
        this.sections = [];
        this.bienForm.get('section')?.setValue('');
      }
      this.genererIdentifiantAuto();
    }); 
    
    // Déclenche automatiquement le chargement des nicads quand la section change
    this.bienForm.get('section')?.valueChanges.subscribe(section => {
      if (section) {
        this.loadNicads();
      } else {
        this.nicads = [];
        this.bienForm.get('idParcelle')?.setValue('');
      }
      this.genererIdentifiantAuto();
    }); 

    // Génère aussi l'identifiant quand la parcelle (nicad) change
    this.bienForm.get('idParcelle')?.valueChanges.subscribe(() => {
      this.genererIdentifiantAuto();
    });
  }

  private genererIdentifiantAuto(): void {
    const region = this.bienForm.get('region')?.value || '';
    const departement = this.bienForm.get('departement')?.value || '';
    const commune = this.bienForm.get('commune')?.value || '';
    const section = this.bienForm.get('section')?.value || '';
    const nicad = this.bienForm.get('idParcelle')?.value || '';

    if (region && departement && commune && section && nicad) {
      const deuxPremieres = (val: string) => val.substring(0, 2).toUpperCase();
      const troisChiffresSection = section.substring(0, 3);
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      const heureStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
      const identifiant = `${deuxPremieres(region)}${deuxPremieres(departement)}${deuxPremieres(commune)}${troisChiffresSection}${nicad}${dateStr}${heureStr}`;
      this.bienForm.get('identifiant')?.setValue(identifiant);
    }
  }

  loadProprietaires(): void {
    this.proprietaireService.getAllProprietaires().subscribe(
      (data) => {
        this.proprietaires = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des propriétaires', error);
      }
    );
  }

  toggleSidebar(): void {
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

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({
          file: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.bienForm.valid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
   

    this.localService.getBienById(this.bienForm.value.identifiant).subscribe({
      next: (bienExistant: any) => {
        if (bienExistant) {
          // Modification
          this.localService.updateBien(this.bienForm.value).subscribe({
            next: (_bienModifie: any) => {
              this.uploadImagesEtRedirige(this.bienForm.value.identifiant);
            },
            error: () => {
              alert('Erreur lors de la modification du bien.');
            }
          });
        } else {
          // Ajout
          this.localService.saveBien(this.bienForm.value).subscribe({
            next: (bienCree: any) => {
              const idBien = bienCree.id || bienCree._id || this.bienForm.value.identifiant;
              this.uploadImagesEtRedirige(idBien);
            },
            error: () => {
              alert('Erreur lors de l\'ajout du bien.');
            }
          });
        }
      },
      error: () => {
        // Si erreur (ex : 404), on considère que le bien n'existe pas et on ajoute
        this.localService.saveBien(this.bienForm.value).subscribe({
          next: (bienCree: any) => {
            const idBien = bienCree.id || bienCree._id || this.bienForm.value.identifiant;
            this.uploadImagesEtRedirige(idBien);
          },
          error: () => {
            alert('Erreur lors de l\'ajout du bien.');
          }
        });
      }
    });
  }

  private uploadImagesEtRedirige(idBien: string): void {
    if (this.selectedFiles.length > 0) {
      const uploads = this.selectedFiles.map((img: { file: File; preview: string }) =>
        this.imageService.saveImage(idBien, img.file)
      );
      forkJoin(uploads).subscribe({
        next: () => {
          this.router.navigate(['/locaux']);
        },
        error: () => {
          alert('Bien ajouté/modifié, mais une ou plusieurs images n\'ont pas pu être envoyées.');
          this.router.navigate(['/locaux']);
        }
      });
    } else {
      this.router.navigate(['/locaux']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/locaux']);
  }

  loadDepartements(): void {
    const region = this.bienForm.get('region')?.value;
    if (region) {
      this.departementService.getAllDepartementsByRegion(region).subscribe(
        (data) => {
          this.departements = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des departements', error);
        }
      );
    }
  }
 
  loadCommunes(): void {
    const departement = this.bienForm.get('departement')?.value;
    if (departement) {
      this.communeService.getAllCommunesByDepartement(departement).subscribe(
        (data) => {
          this.communes = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des communes', error);
        }
      );
    }
  }
  loadSections(): void {
    const commune = this.bienForm.get('commune')?.value;
    if (commune) {
      this.sectionService.getAllSectionsByCommune(commune).subscribe(
        (data) => {
          this.sections = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des sections', error);
        }
      );
    }
  }

  loadNicads(): void {
    const region = this.bienForm.get('region')?.value;
    const departement = this.bienForm.get('departement')?.value;
    const commune = this.bienForm.get('commune')?.value;
    const section = this.bienForm.get('section')?.value;
    if (region && departement && commune && section) {
      this.parcelleService.getAllParcellesBySection(section, region, departement, commune).subscribe(
        (data) => {
          this.nicads = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des nicads', error);
        }
      );
    }
  }

}
