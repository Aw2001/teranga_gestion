import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { RecensementService } from '../../../service/recensement.service';
import { RegionService } from '../../../service/region.service';
import { DepartementService } from '../../../service/departement.service';
import { CommuneService } from '../../../service/commune.service';
import { SectionService } from '../../../service/section.service';
import { UtilisateurService } from '../../../service/utilisateur.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-recensement-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './add-recensement-modal.component.html',
  styleUrl: './add-recensement-modal.component.scss'
})
export class AddRecensementModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() recensementAdded = new EventEmitter<any>();
  regions: any[] = [];
  departements: any[] = [];
  communes: any[] = [];
  sections: any[] = [];
  agents: any[] = [];  
  recensement = {
    
    numRecensement: '',
    methodeRecensement: 'Classique',
    etat: 'A compléter',
    service: '',
    typeService: '',
    dateDebut: new Date().toISOString().slice(0, 19),
    dateFin: new Date().toISOString().slice(0, 19),
    commentaire: '',
    region: '',
    departement: '',
    commune: '',
    section: '',
    titre: '',
    dateCreation: new Date().toISOString().slice(0, 19),
    
  };

  selectedAgents: any[] = [];
  selectedAgent: any = null; // Pour stocker l'agent actuellement sélectionné dans le select
  constructor(
    private recensementService: RecensementService,
    private regionService: RegionService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private sectionService: SectionService,
    private utilisateurService: UtilisateurService,
    private dialog: MatDialog
  ) {}  
  
  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions() {
    this.regionService.getAllRegions().subscribe({
      next: (regions) => {
        this.regions = regions;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des régions:', err);
        this.regions = [];
      }
    });
  }  
  
  onRegionChange(regionName: string) {
    console.log('Région sélectionnée:', regionName); // Pour déboguer
    this.recensement.region = regionName;
    this.recensement.departement = '';
    this.recensement.commune = '';
    this.recensement.section = '';
    this.communes = [];
    this.sections = [];
    
    // Charger les départements
    this.departementService.getAllDepartementsByRegion(regionName).subscribe({
      next: (departements) => {
        console.log('Départements reçus:', departements); // Pour déboguer
        this.departements = Array.isArray(departements) ? departements : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des départements:', err);
        this.departements = [];
      }
    });

    // Charger les agents pour la région sélectionnée
    this.utilisateurService.retournerAgents().subscribe({
      next: (data) => {
        this.agents = JSON.parse(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents:', err);
        this.agents = [];
      }
    });
  }
  onDepartementChange(departementName: string) {
    this.recensement.departement = departementName;
    this.recensement.commune = '';
    this.recensement.section = '';
    this.sections = [];

    this.communeService.getAllCommunesByDepartement(departementName).subscribe({
      next: (communes) => {
        console.log('Communes reçues:', communes); // Pour déboguer
        this.communes = Array.isArray(communes) ? communes : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des communes:', err);
        this.communes = [];
      }
    });
  }

  onCommuneChange(commune: string) {
    this.recensement.commune = commune;
    this.recensement.section = '';

    this.sectionService.getAllSectionsByCommune(commune).subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sections:', err);
        this.sections = [];
      }
    });
  }
  generateNumRecensement(): string {
    // Extraction des 2 premières lettres de chaque élément
    const region = this.recensement.region.substring(0, 2).toUpperCase();
    const departement = this.recensement.departement.substring(0, 2).toUpperCase();
    const commune = this.recensement.commune.substring(0, 2).toUpperCase();
    const section = this.recensement.section;
    const service = this.recensement.service.substring(0, 2).toUpperCase();
    
    // Obtention de la date et l'heure actuelles
    const now = new Date();
    const date = now.toISOString().split('T')[0].replace(/-/g, ''); // Format: YYYYMMDD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, ''); // Format: HHMMSS
    
    // Création du numéro de recensement
    return `${region}${departement}${commune}${section}${service}${date}${time}`;
  }  
  
  confirmAjout(): Promise<boolean> {
    const message = `Région: <span>${this.recensement.region}</span>\n` +
      `Département: <span>${this.recensement.departement}</span>\n` +
      `Commune: <span>${this.recensement.commune}</span>\n` +
      `Section: <span>${this.recensement.section}</span>\n` +
      `Service: <span>${this.recensement.service}</span>\n` +
      `Méthode: <span>${this.recensement.methodeRecensement}</span>\n` +
      `Agents: <span>${this.selectedAgents.map(a => a.prenom + ' ' + a.nom).join(', ')}</span>\n` +
      `Date de début: <span>${this.recensement.dateDebut}</span>\n` +
      `Date de fin: <span>${this.recensement.dateFin}</span>`;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation d\'ajout',
        message: message,
        showCancel: true,
        confirmText: 'Confirmer',
        cancelText: 'Annuler'
      }
    });

    return dialogRef.afterClosed().toPromise();
  }

  async onSubmit() {
    // Génération du numéro de recensement
    this.recensement.numRecensement = this.generateNumRecensement();
    
    // Demande de confirmation
    const confirmed = await this.confirmAjout();
    if (!confirmed) {
      return; // Annulation si l'utilisateur ne confirme pas
    }

    this.recensementService.createRecensement(this.recensement).subscribe({
      next: (newRecensement) => {
        console.log('Recensement créé avec succès:', newRecensement);
        
        // Vérifier si le numéro de recensement est valide
        if (!newRecensement || !newRecensement.numRecensement) {
          console.error('Erreur: Le numéro de recensement est invalide ou manquant', newRecensement);
          // Afficher un message d'erreur
          this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              title: 'Erreur',
              message: 'Le numéro de recensement est invalide ou manquant.',
              showCancel: false,
              confirmText: 'OK'
            }
          });
          return;
        }
        
        // Vérifier si des agents sont sélectionnés
        if (!this.selectedAgents || this.selectedAgents.length === 0) {
          console.warn('Aucun agent sélectionné pour ce recensement');
          // Continuer sans créer d'associations
          this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              title: 'Succès',
              message: 'Le recensement a été ajouté avec succès !',
              showCancel: false,
              confirmText: 'OK'
            }
          }).afterClosed().subscribe(() => {
            // Émettre l'événement avec le nouveau recensement
            this.recensementAdded.emit(newRecensement);
            // Forcer le rechargement de la page
            window.location.reload();
          });
          return;
        }
        
        // Création des associations recensement-utilisateur pour chaque agent
        const createUserAssociations = this.selectedAgents.map(agent => {
          // Vérifier si l'agent a un identifiant valide (qui contient l'email)
          if (!agent || !agent.identifiant) {
            console.error('Erreur: Agent sans identifiant valide', agent);
            return null;
          }
          
          const association = {
            identifiantRecensement: newRecensement.numRecensement,
            identifiantUtilisateur: agent.identifiant
          };
          
          console.log('Création d\'association pour:', association);
          return this.recensementService.createRecensementUser(association);
        }).filter(obs => obs !== null); // Filtrer les associations invalides

        // Attendre que toutes les associations soient créées
        if (createUserAssociations.length > 0) {
          console.log(`Tentative de création de ${createUserAssociations.length} associations...`);
          // Utilisation de firstValueFrom au lieu de toPromise (déprécié)
          Promise.all(createUserAssociations.map(obs => firstValueFrom(obs)))
            .then((results) => {
              console.log('Résultats des créations d\'associations:', results);
              this.dialog.open(ConfirmDialogComponent, {
                width: '400px',
                data: {
                  title: 'Succès',
                  message: 'Le recensement a été ajouté avec succès !',
                  showCancel: false,
                  confirmText: 'OK'
                }
              }).afterClosed().subscribe(() => {
                // Émettre l'événement avec le nouveau recensement
                this.recensementAdded.emit(newRecensement);
                // Forcer le rechargement de la page
                window.location.reload();
              });
            })
            .catch(error => {
              console.error('Erreur lors de la création des associations agent-recensement:', error);
              this.dialog.open(ConfirmDialogComponent, {
                width: '400px',
                data: {
                  title: 'Erreur',
                  message: 'Erreur lors de la création des associations avec les agents. Détails: ' + JSON.stringify(error),
                  showCancel: false,
                  confirmText: 'OK'
                }
              });
            });
          } else {
            this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              title: 'Succès',
              message: 'Le recensement a été ajouté avec succès !',
              showCancel: false,
              confirmText: 'OK'
            }
          }).afterClosed().subscribe(() => {
            // Émettre l'événement avec le nouveau recensement
            this.recensementAdded.emit(newRecensement);
           
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la création du recensement:', error);
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Erreur',
            message: 'Erreur lors de la création du recensement. Détails: ' + JSON.stringify(error),
            showCancel: false,
            confirmText: 'OK'
          }
        });
      }
    });
  }
  addAgent(agent: any) {
    if (agent && !this.selectedAgents.find((a: any) => a.identifiant === agent.identifiant)) {
      this.selectedAgents.push(agent);
      this.selectedAgent = null; // Réinitialiser la sélection après l'ajout
    }
  }

  removeAgent(agent: any) {
    const index = this.selectedAgents.findIndex((a: any) => a.identifiant === agent.identifiant);
    if (index !== -1) {
      this.selectedAgents.splice(index, 1);
    }
  }

  close() {
    this.closeModal.emit();
  }
}
