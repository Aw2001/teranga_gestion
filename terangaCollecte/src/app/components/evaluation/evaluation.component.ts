import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecretService } from '../../service/decret.service';
import { FormsModule } from '@angular/forms';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BaremeService } from '../../service/bareme.service';
import { UtilisateurService } from '../../service/utilisateur.service';


@Component({
  selector: 'app-evaluation',
  imports: [FormsModule, CommonModule],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class EvaluationComponent {
  //error
  nicadError: string = '';  
  numParcelleError: string = '';
  numTfError: string = '';
  numSectionError: string = '';
  cniError: string = '';
  nineaError: string = '';
  regionError: string = '';
  departementError: string = '';
  communeError: string = '';
  secteurError: string = '';
  zoneError: string = '';

  isSidebarActive: boolean = false;
  
  // Date actuelle pour le pied de page du rapport
  currentDate: Date = new Date();

  // Variables pour stocker les entrées
  enqueteur: string = '';
  dateEnquete!: Date;
  section: string = '';
  nicad: string = '';
  numParcelle: string = '';
  numTF!: number;
  typeConstruction: string = '';
  typeToiture: string = '';
  typeSol: string = '';
  typeMenuiserie: string = '';
  destination: string = '';
  rue: string = '';
  anneeConstruction!: number;
  prenom: string = '';
  nom: string = '';
  dateNaissance!: Date;
  lieuNaissance: string = '';
  adresse: string = '';
  cni: string = '';
  profession: string = '';
  ninea: string = '';
  loyerAnnuel!: number
  typeReference: string = '';
  statut: string = '';
  categories: string[] = [];
  surfaceTerrain: number = 0;
  surfaceBatie: number = 0;
  secteur: string = '';
  zone: string = '';
  commune: string = '';
  departement: string = '';
  surfaceBalcon: number = 0;
  nbNiveau: number = 0;
  nbAnnee: number = 0;
  categorie: string = '';
  coefVet: number = 0;
  coefVoi: number = 0;
  typeImmeuble: string = '';
  surfaceReelleCours: number = 0;
  surfaceReelleCloture: number = 0;
  categorieCours: string = '';
  categorieCloture: string = ''
  coefVetCours: number = 0;
  coefVetCloture: number = 0;
  coutEstimatif: number = 0;
  dateRealisation!: Date;
  dateReevaluation!: Date;
  surfaceReelleAmenagement: number = 0;
  coefVetAmenagement: number = 0;
  surfaceReelleDependance: number = 0;
  surfaceCorrigeeDependance: number = 0;
  coefVetDependance: number = 0;
  categorieDependance: string = '';
  valeurDependance: number = 0;
  // Variables pour stocker les résultats
  taux: number = 0
  surfaceNonBatie: number = 0;
  prixM2NonBati: number | undefined;
  valeurSolNonBati: number = 0;
  prixM2Bati: number = 0;
  valeurSolBati: number = 0;
  valeurSolTotal: number = 0;
  surfaceHorsOeuvre: number = 0;
  surfaceUtile: number = 0;
  abattement: number = 0;
  surfaceCorrigee: number = 0;
  prixM2Local: number | undefined;
  valeurLocal: number = 0;
  surfaceCorrigeeCours: number = 0;
  surfaceCorrigeeCloture: number = 0;
  prixM2Cours: number | undefined;
  prixM2Cloture: number | undefined;
  valeurCours: number = 0;
  valeurCloture: number = 0;
  surfaceCorrigeeAmenagement: number = 0;
  valeurAmenagementParticulier: number = 0;
  valeurImmeuble: number = 0;
  valeurImmeubleFinale: number = 0;
  valeurLocative: number = 0;
  prixDependance: number = 0;

  //variable pour contenir certaines caractéristiques
  region: string = '';

  secteurs: any[] = [];
  zones: any[] = [];
  communes: any[] = [];
  departements: any[] = [];
  errors: any;
 
  

  // Injection du service DecretService
  constructor(private decretService: DecretService, private baremeService: BaremeService, private userService: UtilisateurService,) { }

  ngOnInit(): void { }

  validateRegion() {
    if(!this.region) {
      this.regionError = 'Ce champ est obligatoire.'
    } else {
      this.regionError = '';
    }
    
  }
  validateDepartement() {
    if(!this.departement) {
      this.departementError = 'Ce champ est obligatoire.'
    } else {
      this.departementError = '';
    }
    
  }
  validateCommune(){
    if(!this.commune) {
      this.communeError = 'Ce champ est obligatoire.'
    } else {
      this.communeError = '';
    }
  }

  validateSecteur() {
    if(!this.secteur) {
      this.secteurError = 'Ce champ est obligatoire.'
    } else {
      this.secteurError = '';
    }
  }

  validateZone(){
    if(!this.zone) {
      this.zoneError = 'Ce champ est obligatoire.'
    } else {
      this.zoneError = '';
    }
  }

  //error
  validateNicad() {
    if (!this.nicad) {
      this.nicadError = ''; 
      return;
    }
    
    const nicadRegex = /^0\d{15}$/;
    this.nicadError = nicadRegex.test(this.nicad) ? '' : 'Le NICAD doit contenir 16 chiffres et commencer par 0.';
  }
  validateNumParcelle() {
    if (!this.numParcelle) {
      this.numParcelleError = ''; 
      return;
    }
    
    const numParcelleRegex = /^\d{5}$/;
    this.numParcelleError = numParcelleRegex.test(this.numParcelle) ? '' : 'Le numéro de parcelle doit contenir 5 chiffres.';
  }
  validateNumSection() {
    if (!this.section) {
      this.numSectionError = ''; 
      return;
    }
    
    const numSectionRegex = /^\d{3}$/;;
    this.numSectionError = numSectionRegex.test(this.section) ? '' : 'Le numéro de section doit contenir 3 chiffres.';
  }
  validateCni() {
    if (!this.cni) {
      this.cniError = ''; 
      return;
    }
    
    const cniRegex = /^\d{13,14}$/;
    this.cniError = cniRegex.test(this.cni) ? '' : 'Le cni doit contenir 13 ou 14 chiffres.';
  }

  loadDepartements(): void {
    if (this.region) {
      this.decretService.getDepartements(this.region).subscribe(
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
    if (this.departement) {
      this.decretService.getCommunes(this.departement).subscribe(
        (data) => {
          this.communes = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des communes', error);
        }
      );
    }
  }

  loadSecteurs(): void {
    if (this.commune) {
      this.decretService.getSecteurs(this.commune).subscribe(
        (data) => {
          this.secteurs = data;  // Stocke les secteurs récupérés dans la variable
        },
        (error) => {
          console.error('Erreur lors de la récupération des secteurs', error);
        }
      );
    }
  }
  loadZones(): void {
    if (this.region && this.departement && this.commune && this.secteur) {
      this.decretService.getZones(this.region, this.departement, this.commune, this.secteur).subscribe(
        (data) => {
          this.zones = data;  // Stocke les secteurs récupérés dans la variable
        },
        (error) => {
          console.error('Erreur lors de la récupération des zones', error);
        }
      );
    }
  }

  checkInputs1(): void {
    if (this.departement) {
      this.loadCommunes();
    }
  }

  checkInputs(): void {
    if (this.commune) {
      this.loadSecteurs();  // Appelle la méthode pour charger les secteurs si les deux sont remplis
    }
  }

  checkInputs2(): void {
    if (this.secteur) {
      this.loadZones();
    }
  }
  checkInputs3(): void {
    if (this.region) {
      this.loadDepartements();
    }
  }

  updateCategories() {
    if (this.typeImmeuble === 'Collectif') {
      this.categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    } else {
      this.categories = ['1', '2', '3', '4', '5', '6', '7'];
    }
  }

  async evaluerTerrain(): Promise<void> {
    this.validateRegion();
    this.validateDepartement();
    this.validateCommune();
    this.validateSecteur();
    if (this.surfaceTerrain > 0 && this.surfaceBatie >= 0) {
      this.surfaceNonBatie = this.surfaceTerrain - this.surfaceBatie;
    }
    if (this.secteur && this.zone) {
      try {
        // Utilisation de firstValueFrom pour convertir l'observable en Promise
        this.prixM2NonBati = await this.decretService.getPrix(this.region, this.departement, this.commune, this.secteur, this.zone).toPromise();
        this.prixM2Bati = this.prixM2NonBati! / 2;

        this.valeurSolNonBati = parseFloat((this.prixM2NonBati! * this.surfaceNonBatie).toFixed(2));
        this.valeurSolBati = parseFloat((this.prixM2Bati * this.surfaceBatie).toFixed(2));

        this.valeurSolTotal = parseFloat((this.valeurSolBati + this.valeurSolNonBati).toFixed(2));
        this.valeurImmeuble = parseFloat(this.valeurSolTotal.toFixed(2));

      } catch (error) {
        console.error('Erreur lors de la récupération du prix', error);
      }


    }
  }

  async evaluerLocal(): Promise<void> {
    if (this.surfaceBatie > 0 && this.nbNiveau > 1) {
      if (this.surfaceBalcon > 0) {
        this.surfaceHorsOeuvre = parseFloat(((this.nbNiveau * this.surfaceBatie) + ((this.nbNiveau - 1) * this.surfaceBalcon)).toFixed(2));
        this.surfaceUtile = parseFloat((this.surfaceHorsOeuvre * 0.78).toFixed(2));
      } else {
        this.surfaceHorsOeuvre = parseFloat((this.nbNiveau * this.surfaceBatie).toFixed(2));
        this.surfaceUtile = parseFloat((this.surfaceHorsOeuvre * 0.78).toFixed(2));
      }

    } else if (this.surfaceBatie > 0 && this.nbNiveau == 1) {
      this.surfaceHorsOeuvre = parseFloat(this.surfaceBatie.toFixed(2));
      this.surfaceUtile = parseFloat((this.surfaceHorsOeuvre * 0.78).toFixed(2));
    }
    if(this.nbAnnee >= 1 && this.nbAnnee <= 5) {
      this.abattement = 1;
    }
    else if (this.nbAnnee > 5 && this.nbAnnee <= 15) {
      this.abattement = (1 - (this.nbAnnee - 5) * 0.05);
    }
    if (Number(this.coefVet) > 0 && Number(this.coefVoi) > 0 && this.abattement > 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVet) * Number(this.coefVoi) * this.abattement).toFixed(2));
    } else if (Number(this.coefVet) === 0 && Number(this.coefVoi) > 0 && this.abattement > 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVoi) * this.abattement).toFixed(2));
    } else if (Number(this.coefVet) > 0 && Number(this.coefVoi) === 0 && this.abattement > 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVet) * this.abattement).toFixed(2));
    } else if (Number(this.coefVet) > 0 && Number(this.coefVoi) > 0 && this.abattement === 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVet) * Number(this.coefVoi)).toFixed(2));
    } else if (Number(this.coefVet) === 0 && Number(this.coefVoi) === 0 && this.abattement > 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * this.abattement).toFixed(2));
    } else if (Number(this.coefVet) === 0 && Number(this.coefVoi) > 0 && this.abattement === 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVoi)).toFixed(2));
    } else if (Number(this.coefVet) > 0 && Number(this.coefVoi) === 0 && this.abattement === 0) {
      this.surfaceCorrigee = parseFloat((this.surfaceUtile * Number(this.coefVet)).toFixed(2));
    } else {
      this.surfaceCorrigee = parseFloat(this.surfaceUtile.toFixed(2)); // Tous les coefficients sont à 0
    }
    try {
      if (this.typeImmeuble === 'Collectif') {
        this.prixM2Local = await this.baremeService.getPrixImmeubleCollectif(this.region, this.categorie).toPromise();
      } else if (this.typeImmeuble === 'Individuel') {
        this.prixM2Local = await this.baremeService.getPrixImmeubleIndividuel(this.region, this.categorie).toPromise();

      }
      this.prixDependance = this.prixM2Local!;
      // Calculs après avoir reçu les données asynchrones
      this.valeurLocal = parseFloat((this.surfaceCorrigee * this.prixM2Local!).toFixed(2));
      this.valeurImmeuble = parseFloat((this.valeurSolTotal + this.valeurLocal).toFixed(2));

      // Déterminer le taux et évaluer l'immeuble
      this.taux = this.determinerTaux();
      this.evaluerImmeuble(this.taux);

      console.log(this.valeurImmeuble)
    } catch (error) {
      console.error('Erreur lors de la recupération');
    }

  }

  async evaluerCours(): Promise<void> {
    if (this.surfaceReelleCours > 0) {
      if (Number(this.coefVetCours) > 0) {
        this.surfaceCorrigeeCours = parseFloat((this.surfaceReelleCours * Number(this.coefVetCours)).toFixed(2));
      } else {
        this.surfaceCorrigeeCours = parseFloat(this.surfaceReelleCours.toFixed(2));
      }
      

    }
    if (this.categorieCours && this.region) {
      try {
        this.prixM2Cours = await this.baremeService.getPrixCours(this.region, this.categorieCours).toPromise();
        this.valeurCours = parseFloat((this.surfaceCorrigeeCours * this.prixM2Cours!).toFixed(2));
        this.valeurImmeuble = parseFloat((this.valeurSolTotal + this.valeurLocal + this.valeurCours).toFixed(2));
        this.evaluerImmeuble(this.taux);
        console.log(this.valeurImmeuble)
      } catch (error) {
        console.error('Erreur lors de la recupération du prix', error);
      }

    }

  }
  async evaluerCloture(): Promise<void> {
    if (this.surfaceReelleCloture > 0) {
      if (Number(this.coefVetCloture) > 0) {
        this.surfaceCorrigeeCloture = parseFloat((this.surfaceReelleCloture * Number(this.coefVetCloture)).toFixed(2));
      } else {
        this.surfaceCorrigeeCloture = parseFloat(this.surfaceReelleCloture.toFixed(2));
      }
      
    }
    if (this.categorieCloture && this.region) {
      try {
        this.prixM2Cloture = await this.baremeService.getPrixCloture(this.region, this.categorieCloture).toPromise();
        this.valeurCloture = parseFloat((this.surfaceCorrigeeCloture * this.prixM2Cloture!).toFixed(2));
        this.valeurImmeuble = parseFloat((this.valeurSolTotal + this.valeurLocal + this.valeurCours + this.valeurCloture).toFixed(2));
        this.evaluerImmeuble(this.taux);
        console.log(this.valeurImmeuble)
      } catch (error) {
        console.error('Erreur lors de la recupération du prix', error);
      }
    }
  }

  evaluerAmenagementParticulier(): void {
    if (this.coutEstimatif > 0) {
      this.valeurAmenagementParticulier = this.coutEstimatif;
    }
    if (this.surfaceReelleAmenagement > 0) {
      if(Number(this.coefVetAmenagement) > 0) {
        this.surfaceCorrigeeAmenagement = parseFloat((this.surfaceReelleAmenagement * Number(this.coefVetAmenagement)).toFixed(2));
      } else if(Number(this.coefVetAmenagement) == 0) {
        this.surfaceCorrigeeAmenagement = parseFloat(this.surfaceReelleAmenagement.toFixed(2));
      }
      
    }
    this.valeurImmeuble = parseFloat((this.valeurSolTotal + this.valeurLocal + this.valeurCours + this.valeurCloture + this.valeurAmenagementParticulier).toFixed(2));
  }
  evaluerDependance(): void {
    if(this.surfaceReelleDependance > 0) {
      if(Number(this.coefVetDependance) > 0) {
        this.surfaceCorrigeeDependance = parseFloat((this.surfaceReelleDependance * Number(this.coefVetDependance)).toFixed(2));
      } else if (Number(this.coefVetDependance) == 0) {
        this.surfaceCorrigeeDependance = parseFloat(this.surfaceReelleDependance.toFixed(2));
      }
    }
    
    if(this.prixDependance > 0) {
      this.valeurDependance = parseFloat((this.surfaceCorrigeeDependance * this.prixDependance).toFixed(2));
    }
    
   
    this.valeurImmeuble = parseFloat((this.valeurSolTotal + this.valeurLocal + this.valeurCours + this.valeurCloture + this.valeurAmenagementParticulier + this.valeurDependance).toFixed(2));

  }
  evaluerImmeuble(tauxDetermine: number): void {
    if (tauxDetermine > 0) {
      this.valeurLocative = parseFloat((this.valeurImmeuble * (tauxDetermine / 100)).toFixed(2));
    }

  }

  determinerTaux(): number {
    if (this.typeImmeuble) {
      if (this.categorie == 'D' || this.categorie == 'E' || this.categorie == 'F'
        || this.categorie == 'G' || this.categorie == '4' || this.categorie == '5' || this.categorie == '6' || this.categorie == '7') {
        return 10;

      } else if (this.categorie == 'B' || this.categorie == 'C' || this.categorie == '2' || this.categorie == '3') {
        return 12;

      } else if (this.categorie == 'A' || this.categorie == '1') {
        return 13.44;

      }

    }
    return 0;
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  @ViewChild('calcul') contentToExport!: ElementRef;

  exportToPDF() {
    // Créer une instance PDF avec le bon format A4
    const pdf = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    // Dimensions de la page A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Générer la première page (sans la section .new-page)
    this.generateFirstPage(pdf, pageWidth, pageHeight, () => {
      // Ajouter une nouvelle page au PDF
      pdf.addPage();
      
      // Générer la deuxième page (avec la section .new-page)
      this.generateSecondPage(pdf, pageWidth, pageHeight, () => {
        // Sauvegarder le PDF
        pdf.save('rapport-evaluation-cadastrale.pdf');
      });
    });
  }
  
  // Générer la première page du PDF
  private generateFirstPage(pdf: any, pageWidth: number, pageHeight: number, callback: Function) {
    // Créer une copie du rapport pour la première page
    const element = this.contentToExport.nativeElement;
    const clone = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    
    // Supprimer les sections qui doivent être sur la deuxième page
    const newPageSection = clone.querySelector('.new-page');
    if (newPageSection && newPageSection.parentNode) {
      // Supprimer cette section et toutes les sections suivantes
      let currentNode = newPageSection as HTMLElement;
      while (currentNode.nextElementSibling) {
        const nextNode = currentNode.nextElementSibling as HTMLElement;
        if (nextNode.parentNode) {
          nextNode.parentNode.removeChild(nextNode);
        }
      }
      // Supprimer la section new-page elle-même
      newPageSection.parentNode.removeChild(newPageSection);
    }
    
    // Supprimer le footer de la première page
    const footer = clone.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.removeChild(footer);
    }
    
    // Appliquer les styles nécessaires pour une capture fidèle
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm';
    clone.style.height = 'auto';
    clone.style.backgroundColor = 'white';
    clone.style.padding = '30px';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.overflow = 'visible';
    
    // Générer l'image de la première page
    html2canvas(clone, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0
    }).then(canvas => {
      // Supprimer le clone après la capture
      document.body.removeChild(clone);
      
      // Ajouter l'image au PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
      
      // Appeler le callback pour continuer
      callback();
    }).catch(error => {
      console.error('Erreur lors de la génération de la première page:', error);
      document.body.removeChild(clone);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    });
  }
  
  // Générer la deuxième page du PDF
  private generateSecondPage(pdf: any, pageWidth: number, pageHeight: number, callback: Function) {
    // Créer une copie du rapport pour la deuxième page
    const element = this.contentToExport.nativeElement;
    const clone = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    
    // Conserver uniquement l'en-tête, la section .new-page et les sections suivantes
    const reportContent = clone.querySelector('.report-content');
    if (reportContent) {
      // Supprimer toutes les sections avant .new-page
      const newPageSection = reportContent.querySelector('.new-page');
      if (newPageSection) {
        let currentNode = reportContent.firstElementChild as HTMLElement;
        while (currentNode && !currentNode.classList.contains('new-page')) {
          const nextNode = currentNode.nextElementSibling as HTMLElement;
          reportContent.removeChild(currentNode);
          currentNode = nextNode;
        }
      }
    }
    
    // Appliquer les styles nécessaires pour une capture fidèle
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm';
    clone.style.height = 'auto';
    clone.style.backgroundColor = 'white';
    clone.style.padding = '30px';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.overflow = 'visible';
    
    // Générer l'image de la deuxième page
    html2canvas(clone, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0
    }).then(canvas => {
      // Supprimer le clone après la capture
      document.body.removeChild(clone);
      
      // Ajouter l'image au PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
      
      // Appeler le callback pour continuer
      callback();
    }).catch(error => {
      console.error('Erreur lors de la génération de la deuxième page:', error);
      document.body.removeChild(clone);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
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

}
