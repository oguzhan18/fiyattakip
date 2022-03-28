import {Component, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {servers} from '../../model/configuration.service';
import {SocketData} from '../../model/socket-data.service';
import {CATEGORYTYPE} from '../../model/category-type.service';


@Component({
  selector: 'app-exfooter',
  templateUrl: './exfooter.component.html',
  styleUrls: ['./exfooter.component.scss']
})
export class ExfooterComponent implements OnInit {
  connection = webSocket(servers.real);
  footerList: SocketData[] = [];
  footerListReplace: SocketData[] = [];

  constructor() {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.connection.subscribe((data: SocketData[]) => {
      if (this.footerList) {
        this.footerList = [];
      }

      data.forEach(item => {
        if (item.Category === CATEGORYTYPE.DOVIZ || item.Category === CATEGORYTYPE.MADEN || item.Category === CATEGORYTYPE.SARRAFIYE) {
          this.footerList.push(item);
        }
      });
      if (this.footerListReplace.length !== 0) {
        if (JSON.stringify(this.footerListReplace) === JSON.stringify(this.footerList)) {

        } else {
          this.footerList.forEach((data, index) => {
            if (data.Ask !== this.footerListReplace[index].Ask) {
              this.percentChange(data, this.footerListReplace[index], index);
            } else {
              data.askPercentChange = 0.00;
              this.footerListReplace[index].askPercentChange = data.askPercentChange;
            }
          });
        }
      } else {
        this.footerListReplace = this.footerList;
      }
    });
  }

  trackByPrice(index: number, code) {
    return code.Ask;
  }
  /**
   * WS'den gelen fiyat farklılıklarını hesaplayan fonksiyon
   * @param newData
   * @param oldData
   *
   **/
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



}
