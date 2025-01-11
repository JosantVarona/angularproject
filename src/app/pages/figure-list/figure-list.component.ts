import { Component } from '@angular/core';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-figure-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './figure-list.component.html',
  styleUrl: './figure-list.component.css'
})
export class FigureListComponent {
  figures: Figure[] = [];

  constructor(private figureService: FigureService) {}

  ngOnInit(): void {
    this.figureService.getFigures().subscribe((figures) => {
      this.figures = figures;
    });
  }

  deleteFigure(id: string): void {
    this.figureService.deleteFigure(id);
  }
}
