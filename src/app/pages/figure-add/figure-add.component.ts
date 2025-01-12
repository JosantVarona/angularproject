import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FigureService } from '../../services/figure.service';
import { Figure } from '../../models/figure';

@Component({
  selector: 'app-figure-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './figure-add.component.html',
  styleUrl: './figure-add.component.css'
})
export class FigureAddComponent {
  figureForm = new FormGroup({
    name: new FormControl(''),
    prize: new FormControl(''),
    size: new FormControl(''),
  });
  constructor(private figureService: FigureService) {}

  submitFigure() {
    let newFigure: Figure = {
      name: this.figureForm.value.name ?? "",
      prize: this.figureForm.value.prize ?? "",
      size: this.figureForm.value.size ?? ""
    }
    this.figureService.addFigure(newFigure).then(()=>{
      this.figureForm.reset();
    });
  }
}
