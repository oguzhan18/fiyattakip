import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ProjectModel } from 'src/app/_models/project.model';
import { MessageService } from 'src/app/_services/message.service';
import { OtherService } from 'src/app/_services/others.service';
import { ProjectService } from 'src/app/_services/project.service';

interface Status {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {

  
project : ProjectModel = new ProjectModel();
editProjectForm: FormGroup;
selectedValue: string;
employee_data : any ='';
company_data : any =  "";
ped : Date;


  constructor(
  private _Router: Router,
  public dialog: MatDialog,
  private _MessageService : MessageService,
  private _FormBuilder: FormBuilder,
  public _ProjectService: ProjectService,
  public _OtherService : OtherService,
  @Inject(MAT_DIALOG_DATA) public data: any,
  
  ) {
    if (this.data.project_end_d == null){
        this.ped = this.data.project_end_d ;
    } else{
      this.ped = this.data.project_end_d.toDate()
    }
  }

projectstatus: Status[] = [
    {value: 'Running', viewValue: 'Running'},
    {value: 'Pipe Line', viewValue: 'Pipe Line'},
    {value: 'Closed', viewValue: 'Closed'}
  ];


 ngOnInit(): void {

/*** Form Validation starts Here */

    this.editProjectForm = this._FormBuilder.group({
      project_id: [{value:this.data.project_id , disabled : true},Validators.required,],
      project_name: [this.data.project_name, Validators.required],
      project_location: [this.data.project_location, Validators.required],
      project_description: [this.data.project_description, Validators.required],
      project_short_description:[this.data.project_short_description, Validators.required ],
      project_status: [this.data.project_status, Validators.required],
      project_estimated_cost: [this.data.project_estimated_cost, Validators.required],
      project_owner: [this.data.project_owner, Validators.required],
      project_manager: [this.data.project_manager, Validators.required],
      project_start_d: [this.data.project_start_d.toDate(), Validators.required],
      project_end_d: [this.ped]

    });

  // to get employee data
  this._OtherService.read_employee().subscribe(data => {
      this.employee_data = data.map(e => {
        return  {
          emp_uid: e.payload.doc.id,
          emp_id: e.payload.doc.data()['emp_id'],
          emp_name: e.payload.doc.data()['emp_name'],
        };
      })
    });
  

  // to get company data
    this._OtherService.read_company().subscribe(data => {
      this.company_data = data.map(e => {
        return  {
          emp_uid: e.payload.doc.id,
          comp_full_name: e.payload.doc.data()['comp_full_name'],
          comp_id: e.payload.doc.data()['comp_id'],
          comp_short_name: e.payload.doc.data()['company_short_name'],
        };
      })
    });


  }
  // this is for the vialidation and showing error massage
 get project_id(): any {
    return this.editProjectForm.get("project_id");
  }
  get project_name(): any {
    return this.editProjectForm.get("project_name");
  }
  get project_location(): any {
    return this.editProjectForm.get("project_location");
  }
  get project_description(): any {
    return this.editProjectForm.get("project_description");
  }
  get project_short_description(): any {
    return this.editProjectForm.get("project_short_description");
  }

  get project_status(): any {
    return this.editProjectForm.get("project_status");
  }

 get project_estimated_cost(): any {
    return this.editProjectForm.get("project_estimated_cost");
  }

  get project_owner(): any {
    return this.editProjectForm.get("project_owner");
  } 
  get project_manager(): any {
    return this.editProjectForm.get("project_manager");
  }

  get project_start_d(): any {
    return this.editProjectForm.get("project_start_d");
  }

  get project_end_d(): any {
    return this.editProjectForm.get("project_end_d");
  }




/*** Form Validation Ends Here */

  onSubmit()  {
    let record = {};
    record['project_id'] = this.project_id.value;
    record['project_name'] = this.project_name.value;
    record['project_location'] = this.project_location.value;
    record['project_description'] = this.project_description.value;
    record['project_short_description'] = this.project_short_description.value;
    record['project_status'] = this.project_status.value;
    record['project_estimated_cost'] = this.project_estimated_cost.value;
    record['project_owner'] = this.project_owner.value;
    record['project_manager'] = this.project_manager.value;
    record['project_start_d'] = this.project_start_d.value;
    record['project_end_d'] = this.project_end_d.value;
    this._ProjectService.update_Project(this.data.project_uid,record).then(resp => {
      this._MessageService.openSnackBar('Project Updated :)') 
      this.dialog.closeAll();
    })
      .catch(error => {
        console.log(error);
      });
  }

}
