import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p [innerHTML]="data.message"></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button *ngIf="data.showCancel" (click)="onNoClick()">{{ data.cancelText || 'Annuler' }}</button>
      <button mat-raised-button color="primary" (click)="onYesClick()">{{ data.confirmText || 'Confirmer' }}</button>
    </mat-dialog-actions>
  `,  styles: [`
    h2[mat-dialog-title] {
      font-size: 1.8rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    mat-dialog-content {
      min-width: 450px;
      white-space: pre-line;
      font-size: 1.2rem;
      line-height: 1.8;
      padding: 1.5rem;
    }
    mat-dialog-content p {
      margin: 1.3rem 0;
    }
    :host ::ng-deep mat-dialog-content p {
      font-size: 1.3rem;
      color: rgba(10, 10, 10, 10);
    }
    :host ::ng-deep mat-dialog-content p span {
 
      color:rgba(148, 92, 34, 1);
      font-size: 1.3rem;
    }
    mat-dialog-actions {
      margin-top: 20px;
      padding: 1rem;
    }
    button {
      font-size: 1.2rem;
      padding: 0.7rem 2rem;
      margin: 0 0.5rem;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      showCancel?: boolean;
      confirmText?: string;
      cancelText?: string;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
