import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  docData, 
  deleteDoc, 
  CollectionReference, 
  query, 
  getDocs, 
  QuerySnapshot, 
  FirestoreDataConverter 
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Figure } from '../models/figure';

const figureConverter: FirestoreDataConverter<Figure> = {
  toFirestore(figure: Figure): any {
    return {
      name: figure.name,
      prize: figure.prize,
      size: figure.size,
    };
  },
  fromFirestore(snapshot: any): Figure {
    const data = snapshot.data();
    return {
      id: snapshot.id,  // Asegúrate de que esto se está pasando correctamente.
      name: data.name,
      prize: data.prize,
      size: data.size,
    };
  },
};

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  figureCollection: CollectionReference<Figure>;

  constructor(private firestore: Firestore) {
    this.figureCollection = collection(this.firestore, 'figures').withConverter(figureConverter);
  }

  getFiguresAsObservable(): Observable<QuerySnapshot<Figure>> {
    const figureQuery = query(this.figureCollection);
    return from(getDocs(figureQuery));
  }

  getFigure(id: string): Observable<Figure | undefined> {
    const figureDocRef = doc(this.figureCollection, id).withConverter(figureConverter);
    return docData(figureDocRef, { idField: 'id' }) as Observable<Figure | undefined>;
  }

  addFigure(figure: Figure): Promise<void> {
    return addDoc(this.figureCollection, figure).then((docRef) => {
      return updateDoc(docRef, { id: docRef.id });
    });
  }

  updateFigure(id: string, figure: Partial<Figure>): Promise<void> {
    const figureDocRef = doc(this.firestore, `figures/${id}`);
    return updateDoc(figureDocRef, figure);
  }

  deleteFigure(id: string): Promise<void> {
    if (!id) {
      return Promise.reject(new Error("ID no válido para eliminar el documento."));
    }
    const figureDocRef = doc(this.firestore, `figures/${id}`);
    return deleteDoc(figureDocRef);
  }
}
