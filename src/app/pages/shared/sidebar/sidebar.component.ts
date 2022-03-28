import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public _AuthService: AuthService) { }
  clock="";
  clockHandle;
  ngOnInit(){
    this.clockHandle = setInterval(()=>{
      this.clock = new Date().toLocaleString();
    },1000);
  }

}
