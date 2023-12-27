import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  @Input () coursesTabInput : any;
  @Input () showTeacherName : boolean;

  constructor(
    private courseService : CourseService,
  ) { }

  ngOnInit() {
  }

  EditCourses(id){}

  deleteCourses(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete course
        this.courseService.deleteCourse(id).subscribe((res)=>{
          console.log("here msg from BE", res.msg); 
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ) 
          // a verifier
        this.courseService.getAllCourses()
        })
      }
    })
  }

}
