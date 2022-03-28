import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {servers} from '../model/configuration.service';
import {Observable} from 'rxjs';
import {SocketData} from '../model/socket-data.service';
import {Router} from '@angular/router';
import {Categories} from '../model/categories.service';

@Injectable(

)
export class HomeProvider {
  connection = webSocket(servers.real);
  errorMessage: any;
  category: Categories[] = [];

  constructor(private router: Router) {
  }

  public initSocket(): Observable<any> {
    this.connection = webSocket(servers.real);
    return this.connection;
  }

  public connectWebSocket(): Observable<SocketData[]> {
    return new Observable<SocketData[]>(observer => {
      this.connection
        .subscribe(
          (message: SocketData[]) => {
            message.forEach((element: SocketData, index) => {
              if (this.category.length === 0) {
                this.category.push({
                  id: index,
                  name: element.Category
                });
              } else if (this.category.length > 0) {
                const finder = this.category.find(data => data.name === element.Category);
                if (!finder) {
                  this.category.push({
                    id: index,
                    name: element.Category
                  });
                }
              }
            });
            observer.next(message);
          }
        );
    });
  }

  returnErrorMessage() {
    return this.errorMessage;
  }

  getCategories() {
    return this.category;
  }
}
