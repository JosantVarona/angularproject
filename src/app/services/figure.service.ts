import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Figure } from '../models/figure';

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  figureCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.figureCollection = collection(this.firestore, 'figures');
  }

  getFigures(): Observable<Figure[]> {
    return collectionData(this.figureCollection, { idField: 'id' }) as Observable<Figure[]>;
  }

  getFigure(id: string): Observable<Figure | undefined> {
    const figureDocRef = doc(this.firestore, `figures/${id}`);
    return docData(figureDocRef) as Observable<Figure | undefined>;
  }

  addFigure(figure: Figure): Promise<void> {
    return addDoc(this.figureCollection, figure) as unknown as Promise<void>;
  }

  updateFigure(id: string, figure: Partial<Figure>): Promise<void> {
    const figureDocRef = doc(this.firestore, `figures/${id}`);
    return updateDoc(figureDocRef, figure) as Promise<void>;
  }

  deleteFigure(id: string): Promise<void> {
    const figureDocRef = doc(this.firestore, `figures/${id}`);
    return deleteDoc(figureDocRef) as Promise<void>;
  }
}
