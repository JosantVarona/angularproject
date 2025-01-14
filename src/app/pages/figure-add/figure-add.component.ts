import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationComponent } from "../../components/notification/notification.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figure-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent, RouterLink],
  templateUrl: './figure-add.component.html',
  styleUrl: './figure-add.component.css',
})
export class FigureAddComponent {
  figureForm = new FormGroup({
    name: new FormControl(''),
    prize: new FormControl(''),
    size: new FormControl(''),
  });
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private figureService: FigureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitFigure() {
    if (!this.validateInputs()) {
      this.showError('Todos los campos son obligatorios.');
      return;
    }
  
    const newFigure: Figure = {
      name: this.figureForm.value.name ?? '',
      prize: this.figureForm.value.prize ?? '',
      size: this.figureForm.value.size ?? '',
    };
  
    this.figureService
      .addFigure(newFigure)
      .then(() => {
        this.showSuccess('Figura añadida correctamente.');
        this.figureForm.reset();
      })
      .catch((error) => {
        this.showError(`Error al añadir la figura: ${error.message}`);
        console.error('Error al añadir la figura:', error);
      });
  }
  
  private validateInputs(): boolean {
    return (
      this.figureForm.value.name?.trim() !== '' &&
      this.figureForm.value.prize?.trim() !== '' &&
      this.figureForm.value.size?.trim() !== ''
    );
  }
  
  private showError(message: string) {
    this.alertMessage = message;
    this.alertClass = 'danger';
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000); // Oculta la alerta después de 3 segundos
  }
  
  private showSuccess(message: string) {
    this.alertMessage = message;
    this.alertClass = 'success';
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000); // Oculta la alerta después de 3 segundos
  }
  
}
