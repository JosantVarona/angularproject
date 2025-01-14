import { Component, OnInit } from '@angular/core';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificationComponent } from "../../components/notification/notification.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-figure-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationComponent],
  templateUrl: './figure-list.component.html',
  styleUrl: './figure-list.component.css'
})
export class FigureListComponent implements OnInit {
  figures: Figure[] = [];
  showAlert: boolean = false; // Controla si mostrar la alerta
  alertMessage: string = ''; // Mensaje de la alerta
  alertClass: string = ''; // Clase de estilo de la alerta

  constructor(
    private figureService: FigureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.figureService.getFiguresAsObservable().subscribe({
      next: (querySnapshot) => {
        this.figures = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Figure[];
      },
      error: (error) => {
        console.error('Error fetching figures:', error);
      },
    });
  }
  
  deleteFigure(id: string | undefined): void {
    if (!id) {
      console.error('Error: id is undefined.');
      return;
    }

    const confirmation = confirm('¿Estás seguro de que quieres eliminar esta figura?');
    if (confirmation) {
      this.figureService.deleteFigure(id)
        .then(() => {
          this.showSuccess('Figura eliminada correctamente.');
          // Actualiza la lista de figuras tras eliminar
          setTimeout(() => {
            this.router.navigate(['/modelos']);
          }, 2000);
          this.figures = this.figures.filter((figure) => figure.id !== id);
        })
        .catch((error) => {
          this.showError(`Error al eliminar la figura: ${error.message}`);
          console.error('Error eliminando la figura:', error);
        });
    }
  }

  private showSuccess(message: string): void {
    this.alertMessage = message;
    this.alertClass = 'success';
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000); // Oculta la alerta después de 3 segundos
  }

  private showError(message: string): void {
    this.alertMessage = message;
    this.alertClass = 'danger';
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000); // Oculta la alerta después de 3 segundos
  }
}
