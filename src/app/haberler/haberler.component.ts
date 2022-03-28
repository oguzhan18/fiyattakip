import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';



@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.scss']
})
export class HaberlerComponent implements OnInit {
  @Output() livePriceEvent: EventEmitter<any> = new EventEmitter<any>();


  public rssItems: any;
  header: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/xml');

  public domainname: any = '';


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getRSS("https://www.milliyet.com.tr/rss/rssNew/ekonomiRss.xml");
    console.log(this.rssItems);
  }


  getRSS(rss: any) {

    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text',
      headers: new HttpHeaders({ "X-Requested-With": "XMLHttpRequest" })
    };
    this.http.get('https://corsapi.aifanet.com/' + rss.replace("https://", ""), requestOptions)
      .subscribe((data) => {
        // console.log(data);

        this.getMilliyet(data)
          .then((data) => {
            this.rssItems = data;
          });

      });
  }

  getMilliyet(data: any) {
    // console.log(data);
    const arr: any[] = [];
    return new Promise(resolve => {


      let k: string | number;
      const arr: any[] = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err: any, result: any) {
        let obj = result;
        for (k in obj.rss.channel[0].item) {
          let data = obj.rss.channel[0].item[k];
          arr.push({
            title: data.title[0],
            pubDate: data.pubDate[0],
            link: data['atom:link'][0].$.href
          });
        }
      });




      resolve(arr);


    });
  }

}
