import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
//kullanıcı modeli ve form grubu için değişken atama
  user: UserAuthModel = new UserAuthModel();
  signUpForm: FormGroup;
  public errorMsg = null;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private _formBuilder: FormBuilder,
    private _AuthService : AuthService,
    private _Router: Router
  ) {}

  ngOnInit() {
    /****** Fron kod dizimi */
    this.signUpForm = this._formBuilder.group({
      email_address: [
        this.user.email_address,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [this.user.password, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
    });
  }
  // hattra mesajları içinm
  get email_address(): any {
    return this.signUpForm.get("email_address");
  }
  get password(): any {
    return this.signUpForm.get("password");
  }
  get phoneNumber(): any {
    return this.signUpForm.get("phoneNumber");
  }

  /****** Front end validation burda bitiyor  */

  //e-mail doğrulaması
  onSubmit() {
   this._AuthService.SignUp(this.email_address.value , this.password.value,this.password.value,)
  }
}
