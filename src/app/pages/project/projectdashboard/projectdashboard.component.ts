import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProjectModel } from 'src/app/_models/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { InsertprojectComponent } from '../insertproject/insertproject.component';
import { EditprojectComponent } from '../editproject/editproject.component';
import { AuthService } from 'src/app/_services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: 'app-projectdashboard',
  templateUrl: './projectdashboard.component.html',
  styleUrls: ['./projectdashboard.component.scss']
})
export class ProjectdashboardComponent implements OnInit  {


  project_data: any;
  role : any ;
  user_data : any = '';
  user_email : any = '';
  displayedColumns: string[]; 
  displayedColumns1: string[] = ['project_id', 'project_estimated_cost', 'project_manager', 'project_status', 'actions'];
  displayedColumns2: string[] = ['project_id', 'project_estimated_cost', 'project_manager', 'project_status'];
  dataSource: MatTableDataSource<ProjectModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor( 
    private _AngularFirestore : AngularFirestore,
    private _ProjectService : ProjectService,
    private _AngularFireAuth : AngularFireAuth,
    private _AuthService : AuthService,
    public dialog: MatDialog,
    private _UserService : UserService
  ) { 

  }


 openInsertprojectDialog(): void {
    const dialogRef = this.dialog.open(InsertprojectComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
    });
  }

 openEditprojectDialog(pi): void {
    const dialogRef = this.dialog.open(EditprojectComponent, {
      width: '80%',
      closeOnNavigation: true,
      data: {
          project_uid: pi.project_uid,
          project_id: pi.project_id,
          project_name: pi.project_name,
          project_location: pi.project_location,
          project_description:pi.project_description,
          project_short_description:pi.project_short_description,
          project_estimated_cost:pi.project_estimated_cost,
          project_owner:pi.project_owner,
          project_manager:pi.project_manager,
          project_status: pi.project_status,
          project_start_d: pi.project_start_d,
          project_end_d: pi.project_end_d,       
        }
        
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
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
    

    ////////
    this._ProjectService.read_project().subscribe(data => {
      this.project_data = data.map(e => {
        return  {
          project_uid: e.payload.doc.id,
          project_id: e.payload.doc.data()['project_id'],
          project_name: e.payload.doc.data()['project_name'],
          project_location: e.payload.doc.data()['project_location'],
          project_description: e.payload.doc.data()['project_description'],
          project_short_description:e.payload.doc.data()['project_short_description'],
          project_status: e.payload.doc.data()['project_status'],
          project_estimated_cost : e.payload.doc.data()['project_estimated_cost'],
          project_owner : e.payload.doc.data()['project_owner'],
          project_manager : e.payload.doc.data()['project_manager'],
          project_start_d: e.payload.doc.data()['project_start_d'],
          project_end_d: e.payload.doc.data()['project_end_d'],
        };
      })
      this.dataSource = new MatTableDataSource(this.project_data);
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
    this._ProjectService.delete_Project(rowID).then(resp => {
    })
      .catch(error => {
        console.log(error);
      });
  };
  }







/** open material dialoge for the project insert */





