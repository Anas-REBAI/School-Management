import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-one',
  templateUrl: './courses-one.component.html',
  styleUrls: ['./courses-one.component.css']
})
export class CoursesOneComponent implements OnInit {

  @Input () coursesInput : any;
  constructor() { }

  ngOnInit() {
  }

}
