import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference, getDocs, QuerySnapshot, query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Figure } from '../models/figure';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  figureCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.figureCollection = collection(this.firestore, 'figures');
  }

  getFiguresAsObservable() {
    const figureQuery = query(this.figureCollection);
    return from(getDocs(figureQuery)); // Convierte la promesa en un Observable
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
