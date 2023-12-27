import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {

  coursesTab : any = [];
  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    // this.coursesTab = JSON.parse(localStorage.getItem("courses" || "[]"));
    this.courseService.getAllCourses().subscribe((response)=>{
      this.coursesTab = response.courses;
    })
  }

}
