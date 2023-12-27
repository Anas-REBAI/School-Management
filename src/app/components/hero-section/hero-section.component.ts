import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  user:any
  
  constructor() { }

  ngOnInit() {
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

  decodeToken(token: string) : any {
    return jwt_decode(token);
  }

}
