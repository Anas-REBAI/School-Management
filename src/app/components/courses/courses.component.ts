import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursesTab : any = [];

  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    // this.coursesTab = JSON.parse(localStorage.getItem("courses" || "[]"));
    this.courseService.getAllCourses().subscribe((response)=>{
      console.log("here response from BE", response.courses);
      this.coursesTab = response.courses;
    })
  }

}
