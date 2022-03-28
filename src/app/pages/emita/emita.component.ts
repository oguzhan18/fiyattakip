import { Component, OnInit } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {servers} from '../../model/configuration.service';
import {SocketData} from '../../model/socket-data.service';
import {CATEGORYTYPE} from '../../model/category-type.service';
@Component({
  selector: 'app-emita',
  templateUrl: './emita.component.html',
  styleUrls: ['./emita.component.scss']
})
export class EmitaComponent implements OnInit{
  isClicked: boolean = false;
  emita:any;
  ngOnInit() {
    this.emita = {
      main : {},
      isDay: true
    };
this.getemitaData();
console.log(this.emita);
 }
  getemitaData(){
    fetch('https://api.genelpara.com/embed/para-birimleri.json')
    .then(response=>response.json())
    .then(data=>{this.setemitaData(data);})
  }
  setemitaData(data: any){
    this.emita = data;
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

  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }
}
