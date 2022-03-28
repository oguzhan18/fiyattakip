import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DenemeComponent } from "./deneme/deneme.component";
import { LayoutComponent } from "./layout/layout.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { ChartComponent } from "./pages/chart/chart.component";

import { DashboardComponent } from './dashboard/dashboard.component';
import { DovizComponent } from "./pages/doviz/doviz.component";
import { EmitaComponent } from "./pages/emita/emita.component";
import { EnerjiComponent } from "./pages/enerji/enerji.component";
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { HomeComponent } from "./pages/home/home.component";
import { MadenComponent } from "./pages/maden/maden.component";
import { NewsComponent } from "./pages/news/news.component";

import { ProjectdashboardComponent } from './pages/project/projectdashboard/projectdashboard.component';
import { ProjectdetailComponent } from './pages/project/projectdetail/projectdetail.component';
import { SarrafiyeComponent } from "./pages/sarrafiye/sarrafiye.component";

import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { VendordashboardComponent } from './pages/vendor/vendordashboard/vendordashboard.component';
import { VendordetailComponent } from './pages/vendor/vendordetail/vendordetail.component';
import { VerifyemailComponent } from './pages/verifyemail/verifyemail.component';
import { AuthGuard } from './_authguard/auth.guard';
import { AllComponent } from "./pages/all/all.component";
import { FallComponent } from "./fall/fall.component";
import { WorlpriceComponent } from "./pages/worlprice/worlprice.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", component: DashboardComponent},
      { path: "deneme", component: DenemeComponent},
      { path: "doviz", component: DovizComponent,                 canActivate: [AuthGuard] },
      { path: "maden", component: MadenComponent,                 canActivate: [AuthGuard] },
      { path: "saraffiye", component: SarrafiyeComponent,         canActivate: [AuthGuard] },
      { path: "dashboard", component: DashboardComponent,         canActivate: [AuthGuard] },
      { path: "world-price", component: WorlpriceComponent,       canActivate: [AuthGuard] },
      { path: "home", component: HomeComponent,  canActivate: [AuthGuard]},
      // { path: "pdashboard", component: ProjectdashboardComponent, canActivate: [AuthGuard] },
      // { path: "project/:name", component: ProjectdetailComponent, canActivate: [AuthGuard] },
      { path: "vdashboard", component: VendordashboardComponent,  canActivate: [AuthGuard] },
      { path: "all", component: FallComponent,                    canActivate: [AuthGuard] },
      { path: "analiz", component:EmitaComponent,                 canActivate: [AuthGuard] },
      { path: "enerji", component:EnerjiComponent,                canActivate: [AuthGuard] },
      { path: "vendor/:name", component: VendordetailComponent,   canActivate: [AuthGuard] },
      { path: "calendar", component:CalendarComponent,            canActivate: [AuthGuard] },
      { path: "signup", component: SignupComponent },
      { path: "signin", component: SigninComponent },
      {path:"chart",component:ChartComponent},
      { path: 'verifyemailaddress', component: VerifyemailComponent },
      { path: 'forgot-password', component: ForgetpasswordComponent },
      { path: '**', component: SignupComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
