import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enerji',
  templateUrl: './enerji.component.html',
  styleUrls: ['./enerji.component.scss']
})
export class EnerjiComponent implements OnInit {

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
    fetch('http://hasanadiguzel.com.tr/api/emtiafiyatlari')
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
