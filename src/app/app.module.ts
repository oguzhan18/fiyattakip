import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";



/// Firebase configration for connection

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DovizComponent } from './pages/doviz/doviz.component';
import { MadenComponent } from './pages/maden/maden.component';
import { SarrafiyeComponent } from './pages/sarrafiye/sarrafiye.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeProvider } from "./serice/home.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HaberlerComponent } from './haberler/haberler.component';
import { ExfooterComponent } from './pages/exfooter/exfooter.component';
import { NewsComponent } from './pages/news/news.component';
import { ChartComponent } from './pages/chart/chart.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EmitaComponent } from './pages/emita/emita.component';
import { EnerjiComponent } from './pages/enerji/enerji.component';
import { AllComponent } from './pages/all/all.component';
import { FallComponent } from './fall/fall.component';
import { WorlpriceComponent } from './pages/worlprice/worlprice.component';

// App Module import


import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatBadgeModule } from "@angular/material/badge";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [AppComponent, DovizComponent, MadenComponent, SarrafiyeComponent,  ExfooterComponent, NewsComponent, CalendarComponent, EmitaComponent, EnerjiComponent,FallComponent,EnerjiComponent,EmitaComponent, WorlpriceComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    HttpClientModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgbModule
  ],
  providers: [{provide:HomeProvider}],
  bootstrap: [AppComponent],
})
export class AppModule {}
