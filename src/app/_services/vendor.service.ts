import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../_models/project.model';
import {HttpClient} from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private _HttpClient: HttpClient,
    private _AngularFirestore : AngularFirestore
  ) { }

create_vendor(record) {
    return this._AngularFirestore.collection('vendors').add(record);
  }

read_vendor() {
    return this._AngularFirestore.collection('vendors').snapshotChanges();
  }

update_vendor(recordID,record){
    return this._AngularFirestore.doc('vendors/' + recordID).update(record);
  }

vendor_byid(recordID){
    return this._AngularFirestore.doc('vendors/' + recordID).snapshotChanges();

  }

delete_vendor(record_id) {
    this._AngularFirestore.doc('vendors/' + record_id).delete();
  }

}
