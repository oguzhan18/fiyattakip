import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from 'src/app/_services/link.service';
import { VendorService } from 'src/app/_services/vendor.service';

@Component({
  selector: 'app-vendordetail',
  templateUrl: './vendordetail.component.html',
  styleUrls: ['./vendordetail.component.scss']
})
export class VendordetailComponent implements OnInit {
vendor_data: any ='';
 name :String;

  constructor(

    private _VendorService : VendorService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.name = this._ActivatedRoute.snapshot.params.name;
      this._VendorService.vendor_byid(this.name).subscribe(data => {
          this.vendor_data = data.payload.data(); 
      });
      
  }
  }