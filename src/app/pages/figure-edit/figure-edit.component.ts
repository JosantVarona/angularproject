import { Component, OnInit } from '@angular/core';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";

@Component({
  selector: 'app-figure-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './figure-edit.component.html',
  styleUrl: './figure-edit.component.css'
})
export class FigureEditComponent {
  figure: Figure = { name: '', prize: '', size: ''};
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private figureService: FigureService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // Obtener los detalles de la empresa desde Firestore
      console.log(this.id);
      this.figureService.getFigure(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar la figura: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (figure) => {
          if (figure) {
            this.figure = figure;
          } else {
            this.alertMessage = `La figura con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }

  updateFigure() {
    if (this.id) {
      this.figureService.updateFigure(this.id, this.figure).then(() => {
        this.alertMessage = `Figura editada correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        this.alertMessage = `Error al editar la figura: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }
}