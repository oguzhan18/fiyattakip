import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VendorModel } from 'src/app/_models/vendor.model';
import { AuthService } from 'src/app/_services/auth.service';
import { ProjectService } from 'src/app/_services/project.service';
import { UserService } from 'src/app/_services/user.service';
import { VendorService } from 'src/app/_services/vendor.service';
import { EditvendorComponent } from '../editvendor/editvendor.component';
import { InservendorComponent } from '../inservendor/inservendor.component';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.scss']
})
export class VendordashboardComponent implements OnInit {


  vendor_data: any;
  role : any ;
  user_data : any ='';
  user_email : any ='';

  displayedColumns: string[];
  displayedColumns1: string[] = ['vendor_id', 'vendor_name', 'vendor_city', 'vendor_state', 'actions'];
  displayedColumns2: string[] = ['vendor_id', 'vendor_name', 'vendor_city', 'vendor_state'];
  dataSource: MatTableDataSource<VendorModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _AngularFirestore : AngularFirestore,
    private _VendortService : VendorService,
    public dialog: MatDialog,
    private _AngularFireAuth : AngularFireAuth,
    private _AuthService : AuthService,
    private _UserService : UserService
  ) {
  }


 openInsertprojectDialog(): void {
    const dialogRef = this.dialog.open(InservendorComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('diyalog kapatıldı');


    });
  }

 openEditprojectDialog(pi): void {
    const dialogRef = this.dialog.open(EditvendorComponent, {
      width: '80%',
      closeOnNavigation: true,
      data: {

          vendor_uid :  pi.vendor_uid,
          vendor_id : pi.vendor_id,
          vendor_name : pi.vendor_name,
          vendor_city : pi.Address.vendor_city,
          vendor_state : pi.Address.vendor_state,
          vendor_pincode : pi.Address.vendor_pincode,
          vendor_country : pi.Address.vendor_country,
          vendor_address : pi.Address.vendor_Address,
        }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('diyalog kapatıldıd');

    });
  }




  ngOnInit(): void  {

      this._AngularFireAuth.user.subscribe(res =>{
        this.user_email = res.email
            this._UserService.getRole(this.user_email).subscribe(data => {
            this.user_data = data.map(e => {
              this.role =  e.payload.doc.data()['role']
              if (this.role == 'admin'){
                    this.displayedColumns = this.displayedColumns1
                } else{
                  this.displayedColumns = this.displayedColumns2
                }
            })
          });
      })
    this._VendortService.read_vendor().subscribe(data => {
      this.vendor_data = data.map(e => {
        return  {
          vendor_uid :  e.payload.doc.id,
          vendor_id : e.payload.doc.data()['vendor_id'],
          vendor_name : e.payload.doc.data()['vendor_name'],
          Address : e.payload.doc.data()['Address'],
        };
      })
      this.dataSource = new MatTableDataSource(this.vendor_data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  RemoveRecord(rowID) {
    this._VendortService.delete_vendor(rowID);
  }
}





