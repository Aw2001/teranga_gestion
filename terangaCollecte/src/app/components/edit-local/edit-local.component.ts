import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalService } from '../../service/local.service';
import { UtilisateurService } from '../../service/utilisateur.service';
import { ImageService } from '../../service/image.service';
import { CommonModule } from '@angular/common';
import { ProprietaireService } from '../../service/proprietaire.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-local',
  templateUrl: './edit-local.component.html',
  styleUrl: './edit-local.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditLocalComponent implements OnInit{
 
  localId: string | null = null;
  local: any = null;
  isSidebarActive = false;
  selectedFiles: { file: File; preview: string }[] = [];
  storagedFiles: { file: File; preview: string }[] = [];
  images: string[] = []; 
  proprietaires: any[] = [];
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
  bienForm: FormGroup;

  constructor(private router: Router,private route: ActivatedRoute, private localService: LocalService, private userService: UtilisateurService, private imageService: ImageService, private proprietaireService: ProprietaireService, private fb: FormBuilder) {
    
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
      coursDeTennis: [''], // valeur par défaut 'oui'
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
    this.localId = this.route.snapshot.paramMap.get('id');
    if (this.localId) {
      this.localService.getBienById(this.localId).subscribe({
        next: (data) => {
          this.local = data;
          // Appliquer la valeur de l'escalier au formulaire
          // Met à jour les champs du formulaire après chargement du bien
          this.bienForm.patchValue({
            identifiant: this.local.identifiant,
            superficie: this.local.superficie,
            proprieteEnLocation: this.local.proprieteEnLocation === 'oui' ? 'oui' : this.local.proprieteEnLocation === 'non' ? 'non' : 'non',
            adresse: this.local.adresse,
            quartier: this.local.quartier,
            village: this.local.village,
            numPorteAdm: this.local.numPorteAdm,
            codeDeRueAdm: this.local.codeDeRueAdm,
            nomRue: this.local.nomRue,
            typeLot: this.local.typeLot,
            niveauLot: this.local.niveauLot,
            localisationLot: this.local.localisationLot,
            situationLot: this.local.situationLot,
            numLot: this.local.numLot,
            valeurLocativeAnnuelle: this.local.valeurLocativeAnnuelle,
            valeurLocativeAnnuelleSaisie: this.local.valeurLocativeAnnuelleSaisie,
            numTitreFoncier: this.local.numTitreFoncier,
            dateAcquisition: this.local.dateAcquisition,
            typeOccupation: this.local.typeOccupation,
            autreTypeOccupation: this.local.autreTypeOccupation === 'oui' ? 'oui' : this.local.autreTypeOccupation === 'non' ? 'non' : 'non',
            dateDelivranceTypeOccupation: this.local.dateDelivranceTypeOccupation,
            usagee: this.local.usagee,
            numCompteurSde: this.local.numCompteurSde,
            numCompteurSenelec: this.local.numCompteurSenelec,
            typeConstruction: this.local.typeConstruction,
            toiture: this.local.toiture,
            typeCloture: this.local.typeCloture,
            etatCloture: this.local.etatCloture,
            typeRevetement: this.local.typeRevetement,
            etatRevetement: this.local.etatRevetement,
            situationRoute: this.local.situationRoute,
            typeRoute: this.local.typeRoute,
            garage: this.local.garage,
            qualitePorteFenetre: this.local.qualitePorteFenetre,
            typeCarrelage: this.local.typeCarrelage,
            menuiserie: this.local.menuiserie,
            conceptionPieces: this.local.conceptionPieces,
            appareilsSanitaires: this.local.appareilsSanitaires,
            parkingInterieur: this.local.parkingInterieur,
            nbAscenseurs: this.local.nbAscenseurs,
            nbSalleBain: this.local.nbSalleBain,
            nbSalleEau: this.local.nbSalleEau,
            nbPieceReception: this.local.nbPieceReception,
            nbTotalPiece: this.local.nbTotalPiece,
            nbEtage: this.local.nbEtage,
            confort: this.local.confort,
            valeurLocativeMensuelle: this.local.valeurLocativeMensuelle,
            valeurLocativeMensuelleSaisie: this.local.valeurLocativeMensuelleSaisie,
            escalier: this.local.escalier === 'oui' ? 'oui' : this.local.escalier === 'non' ? 'non' : 'non',
            videOrdure: this.local.videOrdure === 'oui' ? 'oui' : this.local.videOrdure === 'non' ? 'non' : 'non',
            monteCharge: this.local.monteCharge === 'oui' ? 'oui' : this.local.monteCharge === 'non' ? 'non' : 'non',
            groupeElectrogene: this.local.groupeElectrogene === 'oui' ? 'oui' : this.local.groupeElectrogene === 'non' ? 'non' : 'non',
            dependanceIsolee: this.local.dependanceIsolee === 'oui' ? 'oui' : this.local.dependanceIsolee === 'non' ? 'non' : 'non',
            garageSouterrain: this.local.garageSouterrain === 'oui' ? 'oui' : this.local.garageSouterrain === 'non' ? 'non' : 'non',
            systemeClimatisation: this.local.systemeClimatisation === 'oui' ? 'oui' : this.local.systemeClimatisation === 'non' ? 'non' : 'non',
            systemeDomotique: this.local.systemeDomotique === 'oui' ? 'oui' : this.local.systemeDomotique === 'non' ? 'non' : 'non',
            balcon: this.local.balcon === 'oui' ? 'oui' : this.local.balcon === 'non' ? 'non' : 'non',
            terrasse: this.local.terrasse === 'oui' ? 'oui' : this.local.terrasse === 'non' ? 'non' : 'non',
            systemeSurveillance: this.local.systemeSurveillance === 'oui' ? 'oui' : this.local.systemeSurveillance === 'non' ? 'non' : 'non',
            amenagementPaysager: this.local.amenagementPaysager === 'oui' ? 'oui' : this.local.amenagementPaysager === 'non' ? 'non' : 'non',
            jardin: this.local.jardin === 'oui' ? 'oui' : this.local.jardin === 'non' ? 'non' : 'non',
            piscine: this.local.piscine === 'oui' ? 'oui' : this.local.piscine === 'non' ? 'non' : 'non',
            coursDeTennis:
              this.local.coursDeTennis === 'oui' ? 'oui' : this.local.coursDeTennis === 'non' ? 'non' : 'non',
            coursGazonnee:
              this.local.coursGazonnee === 'oui' ? 'oui' : this.local.coursGazonnee === 'non' ? 'non' : 'non',
            terrainGolf:
              this.local.terrainGolf === 'oui' ? 'oui' : this.local.terrainGolf === 'non' ? 'non' : 'non',
            autre:
              this.local.autre === 'oui' ? 'oui' : this.local.autre === 'non' ? 'non' : 'non',
            angle:
              this.local.angle === 'oui' ? 'oui' : this.local.angle === 'non' ? 'non' : 'non',
            eclairagePublic:
              this.local.eclairagePublic === 'oui' ? 'oui' : this.local.eclairagePublic === 'non' ? 'non' : 'non',
            murEnCiment:
              this.local.murEnCiment === 'oui' ? 'oui' : this.local.murEnCiment === 'non' ? 'non' : 'non',
            attributsArchitecturaux:
              this.local.attributsArchitecturaux === 'oui' ? 'oui' : this.local.attributsArchitecturaux === 'non' ? 'non' : 'non',
            trottoir:
              this.local.trottoir === 'oui' ? 'oui' : this.local.trottoir === 'non' ? 'non' : 'non',
            nomVoirie: this.local.nomVoirie,
            typeVoirie: this.local.typeVoirie,
            nomAutreVoirie: this.local.nomAutreVoirie,
            typeParcelle: this.local.typeParcelle,
            commentaire: this.local.commentaire,
            idProprietaire: this.local.proprietaire.numIdentifiant,
            idParcelle: this.local.parcelle.nicad,
            //locataire: this.local && this.local.locataire ? this.local.locataire : null,
            region: this.local.region,
            departement: this.local.departement,
            commune: this.local.commune,
            section: this.local.section
          });
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
          this.selectedFiles = this.images.map((img: any) => ({ file: img, preview: img }));
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
  onFileSelected(event: any): void {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileObj = {
          file: file,
          preview: e.target.result
        };
        this.selectedFiles.push(fileObj);
        this.storagedFiles.push(fileObj);
      };
      reader.readAsDataURL(file);
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

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  onSubmit(): void {
    if (!this.bienForm.valid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    console.log(this.bienForm.value);
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
        }
      },
    });
  }
  private uploadImagesEtRedirige(idBien: string): void {
    if (this.storagedFiles.length > 0) {
      const uploads = this.storagedFiles.map((img: { file: File; preview: string }) =>
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

  onCancel(): void {
    this.router.navigate(['/locaux']);
  }

}
