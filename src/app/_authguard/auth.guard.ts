import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  canActivate(): boolean {
    if (this._AuthService.isLoggedIn()) {
      return true;
    } else {
      this._Router.navigate(["signin"]);
      return false;
    }
  }
}
