import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-worlprice',
  templateUrl: './worlprice.component.html',
  styleUrls: ['./worlprice.component.scss']
})
export class WorlpriceComponent implements OnInit {

  symbol: string = "forex-cross-rates";
  settings: any = {};
  widgetId: string = '';
  counter = 0;

  public currencies = [
    "EUR","USD","JPY","GBP","CHF","AUD","CAD","NZD","CNY",
    "TRY","SEK","NOK","DKK","ZAR","HKD","SGD","THB","MXN",
    "IDR","KRW","PLN","ISK","KWD","PHP","MYR","INR","TWD",
    "SAR","RUB","ILS"
  ] ;                                                                     //List of all available currencies

  public user_currencies = [
    "TRY","EUR","USD","JPY","GBP","CHF","AUD","CAD","NZD","CNY",
  ]                                                                       //Predefined list of currencies

  @ViewChild('containerDiv', {static: true}) containerDiv: ElementRef;

  constructor( private _elRef: ElementRef ) {
  }                                                                       //Inject Element Reference service
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //Function to create widget
  forexCrossRates(user_currencies: string[]) {
    setTimeout(() => {
      this.widgetId = `${ this.symbol }_fundamentals`;

      if (window.addEventListener) {
        window.addEventListener( 'message', ( e: any ) => {
          if( e && e.data ) {
            console.log(e);
            const payload = e.data;

            if (payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId) {
              this.containerDiv.nativeElement.style.display = 'none';
              }
            }
          }, false,
        );
      }
      this.settings = {
        "width": 840,
        "height": 400,
        "currencies": user_currencies,
        "isTransparent:": true,
        "colorTheme": "dark",
        "locale": "tr",
        "largeChartUrl": "/"
      };

      const script = document.createElement( 'script' );
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
      script.async = true;
      script.id = this.widgetId;
      script.innerHTML = JSON.stringify( this.settings );
      this.containerDiv.nativeElement.appendChild( script );
      const brandingDiv = document.createElement( 'div' );
    } );
  }

  ngAfterViewInit() {
    this.forexCrossRates(this.user_currencies)
    console.log(this.containerDiv)
  }

  //Function to remove previous table
  removeForexScriptTag() {
    const forexChartScript = this._elRef.nativeElement.querySelector(`#${this.widgetId}`);
    console.log(forexChartScript);
    forexChartScript.remove();
  }

  //Update the table with new currency list
  AddCurrency(currency: string) {
    console.log(currency)
    if(this.user_currencies.includes(currency)) {
      var index = this.user_currencies.indexOf(currency);
      this.user_currencies.splice(index, 1);
      console.log("Removed:"+currency);
      console.log("Updated watchlist:"+this.user_currencies);
    }
    else {
      this.user_currencies.push(currency);
      console.log("Pushed:"+currency);
      console.log("Updated watchlist:"+this.user_currencies);
    }
    this.removeForexScriptTag();
    this.forexCrossRates(this.user_currencies)
    console.log("AddCurrency")
    console.log(this.containerDiv)
  }


}
