import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';

import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {SocketData} from '../../model/socket-data.service';
import {CATEGORYTYPE} from '../../model/category-type.service';
import { HomeProvider } from 'src/app/serice/home.service';
import { provideRoutes } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  isClicked: boolean = false;
  code: string = '';
  private subscriptions = new Subscription();
  public pingStatus = true;
  RETRY_SECONDS = 30;
  timer: any;
  interval: any;
  currencyList: SocketData[] = [];
  goldList: SocketData[] = [];
  socketDataList: SocketData[] = [];
  parityList: SocketData[] = [];
  kriptoList: SocketData[] = [];
  ziynetList: SocketData[] = [];
  genelList: SocketData[] = [];
  gramList: SocketData[] = [];

  dataListReplace1: SocketData[] = [];
  dataListReplace2: SocketData[] = [];
  dataListReplace3: SocketData[] = [];
  dataListReplace4: SocketData[] = [];
  dataListReplace5: SocketData[] = [];
  dataListReplace6: SocketData[] = [];
  dataListReplace7: SocketData[] = [];


  emita:any;

  getemitaData(){
    fetch('http://hasanadiguzel.com.tr/api/emtiafiyatlari')
    .then(response=>response.json())
    .then(data=>{this.setemitaData(data);})
  }
  setemitaData(data: any){
    this.emita = data;
  }



  constructor(
    public _AngularFirestore: AngularFirestore,
    private _AuthService : AuthService,
    public _AngularFireAuth: AngularFireAuth,
    private renderer: Renderer2,
    private wsService: HomeProvider,
    private _UserService : UserService) { }

    ngOnInit() {
      this.emita = {
        main : {},
        isDay: true
      };
      this.interval = setInterval(() => {
        if (this.pingStatus === false) {
          this.subscriptions.unsubscribe();
          this.subscriptions = new Subscription();
          this.getData();
        }
      }, this.RETRY_SECONDS * 1000);
      this.getData();
      this.getemitaData();
console.log(this.emita);
    }

    getData() {
      this.wsService.initSocket();

      this.subscriptions.add(this.wsService.connectWebSocket().subscribe((Sdata: SocketData[]) => {
          clearTimeout(this.timer);
          this.pingStatus = true;
          this.socketDataList = Sdata;
          this.filterData();
          this.timer = setTimeout(() => {
            this.pingStatus = false;
          }, 2000);
        },
        (err) => {
          this.pingStatus = true;
        },
        () => {
          this.pingStatus = false;
        }));
    }

    trackByPrice(index: number, code) {
      return code.Ask;
    }

    filterData() {
      if (this.currencyList) {
        this.currencyList = [];
      }
      if (this.goldList) {
        this.goldList = [];
      }
      if (this.parityList) {
        this.parityList = [];
      }
      if (this.kriptoList) {
        this.kriptoList = [];
      }
      if (this.genelList) {
        this.genelList = [];
      }
      if (this.gramList) {
        this.ziynetList = [];
      }
      if (this.gramList) {
        this.gramList = [];
      }
      this.socketDataList.forEach((item, index) => {
        if (item.Category === CATEGORYTYPE.DOVIZ) {
          this.currencyList.push(item);
        } else if (item.Category === CATEGORYTYPE.MADEN) {
          this.goldList.push(item);
        } else if (item.Category === CATEGORYTYPE.SARRAFIYE) {
          this.ziynetList.push(item);
        } else if (item.Category === CATEGORYTYPE.PARITE) {
          this.parityList.push(item);
        } else if (item.Category === CATEGORYTYPE.KRIPTO) {
          this.kriptoList.push(item);
        }
        else if (item.Category === CATEGORYTYPE.GENEL) {
          this.genelList.push(item);
        }
        else if (item.Category === CATEGORYTYPE.GRAMALTIN) {
          this.gramList.push(item);
        }
      });
      if (this.dataListReplace1.length !== 0) {
        if (JSON.stringify(this.dataListReplace1) === JSON.stringify(this.currencyList)) {

        } else {
          this.currencyList.forEach((data, index) => {
            if (data.Ask !== this.dataListReplace1[index].Ask) {
              this.percentChange(data, this.dataListReplace1[index], index);
            } else {
              data.askPercentChange = 0.00;
              this.dataListReplace1[index].askPercentChange = data.askPercentChange;
            }
          });
        }
      } else {
        this.dataListReplace1 = this.currencyList;
      }
      if (this.dataListReplace2.length !== 0) {
        if (JSON.stringify(this.dataListReplace2) === JSON.stringify(this.goldList)) {

        } else {
          this.goldList.forEach((data, index) => {
            if (data.Ask !== this.dataListReplace2[index].Ask) {
              this.percentChange(data, this.dataListReplace2[index], index);
            } else {
              if (data.askPercentChange) {
                this.dataListReplace2[index].askPercentChange = data.askPercentChange;
              } else {
                data.askPercentChange = 0.00;
                this.dataListReplace2[index].askPercentChange = data.askPercentChange;
              }
            }
          });
        }
      } else {
        this.dataListReplace2 = this.goldList;
      }
      if (this.dataListReplace3.length !== 0) {
        if (JSON.stringify(this.dataListReplace3) === JSON.stringify(this.parityList)) {

        } else {
          this.parityList.forEach((data, index) => {
            if (data.Ask !== this.dataListReplace3[index].Ask) {
              this.percentChange(data, this.dataListReplace3[index], index);
            } else {
              if (data.askPercentChange) {
                this.dataListReplace3[index].askPercentChange = data.askPercentChange;
              } else {
                data.askPercentChange = 0.00;
                this.dataListReplace3[index].askPercentChange = data.askPercentChange;
              }
            }
          });
        }
      } else {
        this.dataListReplace3 = this.parityList;
      }
      if (this.dataListReplace4.length !== 0) {
        if (JSON.stringify(this.dataListReplace4) === JSON.stringify(this.kriptoList)) {

        } else {
          this.kriptoList.forEach((data, index) => {
            if (data.Ask !== this.dataListReplace4[index].Ask) {
              this.percentChange(data, this.dataListReplace4[index], index);
            } else {
              if (data.askPercentChange) {
                this.dataListReplace4[index].askPercentChange = data.askPercentChange;
              } else {
                data.askPercentChange = 0.00;
                this.dataListReplace4[index].askPercentChange = data.askPercentChange;
              }
            }
          });
        }
      } else {
        this.dataListReplace4 = this.kriptoList;
      }
      if (this.dataListReplace5.length !== 0) {
        if (JSON.stringify(this.dataListReplace5) === JSON.stringify(this.ziynetList)) {

        } else {
          this.ziynetList.forEach((data, index) => {
            if (data.Ask !== this.dataListReplace5[index].Ask) {
              this.percentChange(data, this.dataListReplace5[index], index);
            } else {
              if (data.askPercentChange) {
                this.dataListReplace5[index].askPercentChange = data.askPercentChange;
              } else {
                data.askPercentChange = 0.00;
                this.dataListReplace5[index].askPercentChange = data.askPercentChange;
              }
            }
          });
        }
      } else {
        this.dataListReplace5 = this.ziynetList;
      }
    }


    percentChange(newData, oldData, index) {
      if (newData.Ask != oldData.Ask) {
        let oldAskPrice = +oldData.Ask;
        let newAskPrice = +newData.Ask;
        let askPriceDifference = (1 - (oldAskPrice / newAskPrice)) * 100;
        newData.askPercentChange = +askPriceDifference.toFixed(2);
        newData.Time = Date.now();
        if (askPriceDifference < 0) {
          const code = newData.Code;
          const element = document.getElementById(code);
        } else if (askPriceDifference > 0) {
          const code = newData.Code;
          const element = document.getElementById(code);
        }
      }
    }


    resizeDiv(id) {
      this.isClicked = !this.isClicked;

      const element = document.getElementById(id);
      element.style.height = '275px';
      if (!this.isClicked) {
        // this.renderer.setStyle(element, 'max-height', '300px');
        element.style.height = '275px';

      } else {
        //this.renderer.setStyle(element, 'max-height', '550px');
        element.style.height = '550px';
      }
    }

    toggle(socketData: SocketData) {
      this.code = socketData.Code;
    }

    ngOnDestroy(): void {
      // clearInterval(this.interval);
    }
}
