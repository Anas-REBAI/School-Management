import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  phoneChild : any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchChild() {
    this.router.navigate([`searchTel/${this.phoneChild}`]);
  }

  isLoggedIn(){
    // recuperer jwt from sessionStorage
    const jwt = sessionStorage.getItem('token'); 
    // if we have token of user
    if (jwt) {  
      this.user = this.decodeToken(jwt)
    }
    // Not Not !! (trajaa boolean "tconverti boolean")
    return !!jwt; 
  }

  
  Exit(){
    sessionStorage.removeItem('token');
    this.router.navigate([""]);
  }
    

  decodeToken(token: string) : any {
    return jwt_decode(token);
  }

}
