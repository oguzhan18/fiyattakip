import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/_models/project.model';
import { LinkService } from 'src/app/_services/link.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})
export class ProjectdetailComponent implements OnInit {
  project_data: any = '';
  link_data : any ='';
  name = "";
  psd : Date;
  ped : Date;
  isnull:boolean;


  constructor(
  private _ProjectService : ProjectService,
  private _ActivatedRoute: ActivatedRoute,
  private _LinkService : LinkService,
  private _AngularFireAuth : AngularFireAuth,
  ) { }

  ngOnInit(): void {
      this.name = this._ActivatedRoute.snapshot.params.name;
      this._ProjectService.read_project_byid(this.name).subscribe(res => {
          this.project_data = res.payload.data();
          this.psd = this.project_data.project_start_d.toDate().toUTCString();
          if (this.project_data.project_end_d != null){
          this.ped = this.project_data.project_end_d.toDate().toUTCString();
          }else{
            this.ped = this.project_data.project_end_d
          }
      this._LinkService.read_link_by_pid(this.project_data.project_id).subscribe(data => {
      this.link_data = data.map(e => {
        var  losd  = e.payload.doc.data()['link_official_billing_start_d'];
        var  lvsd  = e.payload.doc.data()['link_vendor_billing_start_d'];
        if (lvsd == null && losd != null ){var link_status = 'Green'} 
        else if (lvsd == null && losd == null ){var link_status = 'Green'} 
        else if (lvsd != null && losd == null ){var link_status = 'Red'} 
        else if(losd-lvsd > 0){ var link_status = 'Red'}
        else{ var link_status = 'Green'}

        return  {
          link_uid: e.payload.doc.id,
          project_id: e.payload.doc.data()['project_id'],
          link_id: e.payload.doc.data()['link_id'],
          vendor_id : e.payload.doc.data()['vendor_id'],
          link_assigned_to : e.payload.doc.data()['link_assigned_to'],
          link_start_point : e.payload.doc.data()['link_start_point'],
          link_end_point : e.payload.doc.data()['link_end_point'],
          link_desctiprion: e.payload.doc.data()['link_desctiprion'],
          Link_start_date: e.payload.doc.data()['Link_start_date'],
          Link_complete_date: e.payload.doc.data()['Link_complete_date'],
          link_vendor_length: e.payload.doc.data()['link_vendor_length'],
          link_offical_length: e.payload.doc.data()['link_offical_length'],
          link_official_billing_start_d :e.payload.doc.data()['link_official_billing_start_d'],
          link_vendor_billing_start_d : e.payload.doc.data()['link_vendor_billing_start_d'],
          link_comment:e.payload.doc.data()['link_comment'], 
          link_status : link_status,       
        };

      })

    });


  })
  

    
  }


  

  }
