import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorModel } from 'src/app/_models/vendor.model';
import { MessageService } from 'src/app/_services/message.service';
import { VendorService } from 'src/app/_services/vendor.service';

@Component({
  selector: 'app-editvendor',
  templateUrl: './editvendor.component.html',
  styleUrls: ['./editvendor.component.scss']
})
export class EditvendorComponent implements OnInit {


vendor : VendorModel = new VendorModel();
editVendorForm: FormGroup;
selectedValue: string;

  constructor(
  private _FormBuilder: FormBuilder,
  public _VendorService: VendorService,
  private _MessageService : MessageService,
  public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
  }



 ngOnInit(): void {


/*** Form Validation starts Here */

    this.editVendorForm = this._FormBuilder.group({
      vendor_id: [{ value: this.data.vendor_id, disabled :true},Validators.required,],
      vendor_name: [this.data.vendor_name, Validators.required],
      vendor_city: [this.data.vendor_city, Validators.required],
      vendor_state: [this.data.vendor_state, Validators.required],
      vendor_pincode: [this.data.vendor_pincode, Validators.required],
      vendor_country: [this.data.vendor_country, Validators.required],
      vendor_address: [this.data.vendor_address, Validators.required],
    });
  }
  // this is for the vialidation and showing error massage
  get vendor_id(): any {
    return this.editVendorForm.get("vendor_id");
  }
  get vendor_name(): any {
    return this.editVendorForm.get("vendor_name");
  }
  get vendor_city(): any {
    return this.editVendorForm.get("vendor_city");
  }
  get vendor_state(): any {
    return this.editVendorForm.get("vendor_state");
  }

  get vendor_pincode(): any {
    return this.editVendorForm.get("vendor_pincode");
  }
  get vendor_country(): any {
    return this.editVendorForm.get("vendor_country");
  }
    get vendor_address(): any {
    return this.editVendorForm.get("vendor_address");
  }


  onSubmit()  {
    let record = {
      "vendor_id" : this.vendor_id.value,
      "vendor_name": this.vendor_name.value,
      "Address": {
        "vendor_Address": this.vendor_address.value,
        "vendor_city":this.vendor_city.value,
        "vendor_state":this.vendor_state.value,
        "vendor_pincode":this.vendor_pincode.value,
        "vendor_country":this.vendor_country.value,
      }
    };

    this._VendorService.create_vendor(record).then(resp => {
      this._MessageService.openSnackBar('Müşteri Güncellendi')
      this.dialog.closeAll();
    })
      .catch(error => {
        console.log(error);
      });
  }

}
