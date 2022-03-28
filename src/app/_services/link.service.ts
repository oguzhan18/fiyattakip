import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private _HttpClient: HttpClient,
    private _AngularFirestore : AngularFirestore
  ) { }

create_link(record) {
    return this._AngularFirestore.collection('links').add(record);
  }

read_link() {
    return this._AngularFirestore.collection('links').snapshotChanges();
  }

update_link(recordID,record){
    return this._AngularFirestore.doc('links/' + recordID).update(record);
  }

delete_link(record_id) {
    this._AngularFirestore.doc('links/' + record_id).delete();
  }

read_link_byid(recordID) {
    return this._AngularFirestore.doc('links/' + recordID).snapshotChanges();
  }
read_link_by_pid(project_id) {
    return this._AngularFirestore.collection("links", res => res.where('project_id', '==', project_id)).snapshotChanges()
  }

}
