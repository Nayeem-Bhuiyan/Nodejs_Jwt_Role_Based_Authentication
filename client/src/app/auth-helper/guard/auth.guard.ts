import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _tokenStorageService: TokenStorageService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  if (this._tokenStorageService.isAuthenticated()) {
    
      return true;
    }
    this._router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}