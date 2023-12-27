import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  // object
  courses: any = {};
  // Form ID
  coursesForm : FormGroup;

  constructor(
    private courseService: CourseService,
    private router : Router,
    ) { }

  ngOnInit() {
  }

  addCourses(){
    console.log("here courses obj", this.courses);
    this.courseService.addCourse(this.courses).subscribe((response)=>{
      console.log("here response from BE", response.msg);
    })
    this.router.navigate(["courses"]);
    // let coursesTab = JSON.parse(localStorage.getItem ("courses" || "[]"));
    // coursesTab.push(this.courses);
    // localStorage.setItem("courses", JSON.stringify(coursesTab));
  }

}
