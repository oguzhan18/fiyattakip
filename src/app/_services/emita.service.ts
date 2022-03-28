import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emita } from '../_models/emita.model';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';

@Injectable({providedIn:'root'})

  export class EmitaService {

     apiUrl='http://hasanadiguzel.com.tr/api/emtiafiyatlari';

    //apiUrl='https://jsonplaceholder.typicode.com/users';

    constructor(private _http: HttpClient) { }

  getUsers(){
    return this._http.get<Emita[]>(this.apiUrl);
  }
  }
