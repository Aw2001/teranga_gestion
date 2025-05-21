import { Component } from '@angular/core';
import { RecensementService } from '../../service/recensement.service';
import { CommonModule } from '@angular/common';
import { AddRecensementModalComponent } from './add-recensement-modal/add-recensement-modal.component';

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

  constructor(private recensementService: RecensementService) {}

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
}
