import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {

  // pipe Date
  actualDate: Date = new Date();

  // tabs
  coursesTabTeacher:any=[];   // for courses
  classesTabTeacher:any=[];   // for classes

  constructor(
    private courseService: CourseService,
    private clasService: ClasseService,
  ) { }

  ngOnInit() {
    // recuperer idTeacher d'apres TOKEN
    let idTeacher = this.decodeToken(sessionStorage.getItem("token")).id
    // get courses by idTeacher
    this.courseService.showCoursesByTeacher(idTeacher).subscribe((response)=>{
      this.coursesTabTeacher = response.courses
    })
    // get classes by idTeacher
    this.clasService.getClassByTeacherId(idTeacher).subscribe((res)=>{
      this.classesTabTeacher = res.classes
    })
  }

  decodeToken(token: string) : any {
    return jwt_decode(token);
  };

}
