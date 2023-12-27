import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/services/classe.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-dashbord-admin-for-user',
  templateUrl: './dashbord-admin-for-user.component.html',
  styleUrls: ['./dashbord-admin-for-user.component.css']
})
export class DashbordAdminForUserComponent implements OnInit {

  // pipe Date
  actualDate: Date = new Date();

  // tabs
  coursesTabAdmin:any=[];
  classesTabAdmin:any=[];
  
  constructor(
    private courseService: CourseService,
    private clasroomService : ClasseService,
  ) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((response)=>{
      this.coursesTabAdmin = response.courses
      console.log(this.coursesTabAdmin);
      
    })

    

    this.clasroomService.getAllClass().subscribe((res)=>{
      this.classesTabAdmin = res.classes
      console.log(this.classesTabAdmin);
      
    })
  }

}
