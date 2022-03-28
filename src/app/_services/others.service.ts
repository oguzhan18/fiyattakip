import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(
    private _HttpClient: HttpClient,
    private _AngularFirestore : AngularFirestore
  ) { }



read_employee() {
    return this._AngularFirestore.collection('employees').snapshotChanges();
  }

read_company(){
    return this._AngularFirestore.collection('companies').snapshotChanges();
}


}
