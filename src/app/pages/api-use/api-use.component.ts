import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cults3DService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-use.component.html',
  styleUrls: ['./api-use.component.css'],
})
export class ApiList implements OnInit {
  models: any[] = [];
  firstThreeModels: any[] = [];

  constructor(private cults3dService: Cults3DService) {}

  ngOnInit() {
    this.cults3dService.getModels().subscribe((result: any) => {
      this.models = result.data.models;
      this.firstThreeModels = this.models.slice(0, 3);
    });
  }
}

