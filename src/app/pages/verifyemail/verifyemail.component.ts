import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyemailComponent implements OnInit {
 user : any ;
  
  constructor(
    public _AuthService : AuthService,
    ) {
 
    }

  ngOnInit(): void {    
   this.user = this._AuthService.getuser()
  }

sendmail(){
  this._AuthService.sendEmailVerification();
}
}
