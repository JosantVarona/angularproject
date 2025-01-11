import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'users');
  }

  getUsers(): Observable<User[]> {
    return collectionData(this.userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  getUser(id: string): Observable<User | undefined> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef) as Observable<User | undefined>;
  }

  addUser(user: User): Promise<void> {
    return addDoc(this.userCollection, user) as unknown as Promise<void>;
  }

  updateUser(id: string, user: Partial<User>): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userDocRef, user) as Promise<void>;
  }

  deleteUser(id: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef) as Promise<void>;
  }
}
