import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private _Router: Router,
    private _AngularFirestore : AngularFirestore
  ) {}

user_byid(recordID) {
    return this._AngularFirestore.collection('users').doc(recordID).snapshotChanges();
  }

getRole(email){
   return  this._AngularFirestore.collection("roles", res => res.where('email', '==', email )).snapshotChanges();
}

}
