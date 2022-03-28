import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserAuthModel } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
// Global Variable
signInForm: FormGroup;
user: UserAuthModel = new UserAuthModel();

  constructor(private _FormBuilder: FormBuilder,
  public _AuthService: AuthService) {

  }

 ngOnInit(): void {
    //this is required for the form group
    this.signInForm = this._FormBuilder.group({
      username: [
        this.user.email_address,
        [Validators.required, Validators.email],
      ],
      password: [this.user.password, Validators.required],
    });
  }
  // this is for the vialidation and showing error massage
  get username(): any {
    return this.signInForm.get("username");
  }
    get password(): any {
    return this.signInForm.get("password");
  }

onSubmit() {
  this._AuthService.SignIn(this.username.value, this.password.value );
}


}
