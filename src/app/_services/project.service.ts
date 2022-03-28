import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private _HttpClient: HttpClient,
    private _AngularFirestore : AngularFirestore
  ) { }

create_Project(record) {
    return this._AngularFirestore.collection('projects').add(record);
  }

read_project() {
    return this._AngularFirestore.collection('projects').snapshotChanges();
  }

read_project_byid(recordID) {
    return this._AngularFirestore.doc('projects/' + recordID).snapshotChanges();
  }

update_Project(recordID,record){
    return this._AngularFirestore.doc('projects/' + recordID).update(record);
  }

delete_Project(record_id) {
    return this._AngularFirestore.doc('projects/' + record_id).delete();
  }

}
