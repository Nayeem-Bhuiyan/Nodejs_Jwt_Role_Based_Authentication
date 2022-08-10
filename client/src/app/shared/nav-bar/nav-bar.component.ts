import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router,private _tokenStorageService:TokenStorageService ) { }

  ngOnInit(): void {
  }

 isLoggedIn=():boolean=>{
  if  (this._tokenStorageService.isAuthenticated()) {
    return true;
}else{
  return false;
} 
}

signout=():void=>{
  this._tokenStorageService.signOut();
  this.router.navigate(['/login']);
}


}
