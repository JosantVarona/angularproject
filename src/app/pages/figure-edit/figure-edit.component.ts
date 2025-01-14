import { Component, OnInit } from '@angular/core';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { ActivatedRoute, Router } from '@angular/router';  // Importamos Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figure-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent, RouterLink],
  templateUrl: './figure-edit.component.html',
  styleUrls: ['./figure-edit.component.css'],
})
export class FigureEditComponent implements OnInit {
  figure: Figure = { name: '', prize: '', size: '' };
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  figureLoaded: boolean = false;

  constructor(
    private figureService: FigureService,
    private route: ActivatedRoute,
    private router: Router  // Inyectamos Router aquí
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadFigure();
    } else {
      this.showError('No se proporcionó un ID válido para la figura.');
    }
  }

  private loadFigure() {
    this.figureService.getFigure(this.id).subscribe({
      next: (figure) => {
        if (figure) {
          this.figure = figure;
          this.figureLoaded = true;
          this.showSuccess(
            `El modelo a editar es ${figure.name}, de ${figure.prize} de precio y de ${figure.size} de tamaño.`
          );
        } else {
          this.showError(`La figura con ID ${this.id} no existe.`);
        }
      },
    });
  }

  updateFigure() {
    if (!this.validateInputs()) {
      this.showError('Todos los campos son obligatorios.');
      return;
    }

    if (this.id) {
      this.figureService.updateFigure(this.id, this.figure).then(() => {
        this.showSuccess('Figura editada correctamente.');
        // Después de 2 segundos, navegamos a la página de modelos
        setTimeout(() => {
          this.router.navigate(['/modelos']);
        }, 2000);  // 2000 ms = 2 segundos
      }).catch((error) => {
        this.showError(`Error al editar la figura: ${error.message}`);
        console.error('Error editando la figura:', error);
      });
    }
  }

  private validateInputs(): boolean {
    return (
      this.figure.name.trim() !== '' &&
      this.figure.prize.trim() !== '' &&
      this.figure.size.trim() !== ''
    );
  }

  private showError(message: string) {
    this.alertMessage = message;
    this.alertClass = 'danger';
    this.showAlert = true;
  }

  private showSuccess(message: string) {
    this.alertMessage = message;
    this.alertClass = 'success';
    this.showAlert = true;
  }
}
