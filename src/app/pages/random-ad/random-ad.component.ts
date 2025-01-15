// app.component.ts
import { Component, Inject, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Cerveza {
  brand: string;
  name: string;
}
@Component({
  selector: 'app-random-ad',
  standalone: true,
  templateUrl: './random-ad.component.html',
  styleUrls: ['./random-ad.component.css'],
  imports:[CommonModule]
})
export class RandomAdComponent{
  cervezas: Cerveza[] | null = null;

  constructor() {
    this.obtenerCervezaDelDia().then((cervezasObtenidas: Cerveza[]) => {this.cervezas = cervezasObtenidas});
  }

  async obtenerCervezaDelDia(): Promise<Cerveza[]> {
    const data = await fetch('https://random-data-api.com/api/v2/beers?size=5');
    return (await data.json()) ?? [];
  }
}