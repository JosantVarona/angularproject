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
          ...doc.data()
        })) as Figure[];
      },
      error: (error) => {
        console.error('Error fetching figures:', error);
      }
    });
  }
  
  editFigure(id: string, figure: Partial<Figure>): void {
    this.figureService.updateFigure(id, figure)
      .then(() => {
        console.log('Figure updated successfully');
      })
      .catch((error) => {
        console.error('Error updating figure:', error);
      });
  }
  

  deleteFigure(id: string | undefined): void {
    if (!id) {
      console.error('Error: id is undefined.');
      return;
    }
    this.figureService.deleteFigure(id);  }
}
