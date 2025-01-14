import { Component, OnInit } from '@angular/core';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-figure-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './figure-list.component.html',
  styleUrl: './figure-list.component.css'
})
export class FigureListComponent implements OnInit {
  figures: Figure[] = [];

  constructor(private figureService: FigureService) {}

  ngOnInit(): void {
    this.figureService.getFiguresAsObservable().subscribe({
      next: (querySnapshot) => {
        this.figures = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Usa doc.data() para obtener los datos
        })) as Figure[];
      },
      error: (error) => {
        console.error('Error fetching figures:', error);
      },
    });
  }
  
  editFigure(id: string, updatedFigure: Partial<Figure>) {
    this.figureService.updateFigure(id, updatedFigure)
      .then(() => console.log('Figura actualizada correctamente'))
      .catch((error) => console.error('Error al actualizar la figura:', error));
  }
  

  deleteFigure(id: string | undefined): void {
    if (!id) {
      console.error('Error: id is undefined.');
      return;
    }
    this.figureService.deleteFigure(id);  }
}
