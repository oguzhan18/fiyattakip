import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2, SimpleChange,
  SimpleChanges
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
declare const TradingView: any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() code: string;
  private _code; // private property _item

  // use getter setter to define the property
  get item(): any {
    return this._code;
  }

  @Input() set item(val: any) {
    this._code = val;
    this._code.status = 'In Process';
  }

  constructor(private renderer: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    const currentItem: SimpleChange = changes.code;
    new TradingView.widget(
      {
        'width': '100%',
        'height': 320,
        'symbol': currentItem.currentValue,
        'interval': '1',
        'timezone': 'Europe/Istanbul',
        'theme': 'dark',
        'style': '2',
        'locale': 'tr',
        'toolbar_bg': '#f1f3f6',
        'enable_publishing': false,
        'allow_symbol_change': true,
        'save_image': false,
        'container_id': 'chart'
      }
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
