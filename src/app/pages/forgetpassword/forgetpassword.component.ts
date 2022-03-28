import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthModel } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

 
// Global Variable
forgetPasswordForm: FormGroup;
user: UserAuthModel = new UserAuthModel();

  constructor(private _FormBuilder: FormBuilder,
  public _AuthService: AuthService) { }

 ngOnInit(): void {
    //this is required for the form group
    this.forgetPasswordForm = this._FormBuilder.group({
      email_address: [this.user.email_address,[Validators.required, Validators.email],],
    });
  }
  // this is for the vialidation and showing error massage
  get email_address(): any {
    return this.forgetPasswordForm.get("email_address");
  }


onSubmit() {
  this._AuthService.ForgotPassword(this.email_address.value);
}


}
