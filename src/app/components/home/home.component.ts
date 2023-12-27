import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // objet pour le passer en parametre dans la balise
  course : any ={name: "Angular", description:"framework", dure: "20h"}


  constructor() { }

  ngOnInit() {
  }

}
