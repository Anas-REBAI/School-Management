import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  // form Id
  classForm: FormGroup;
  // objet
  class: any = {};

  // Tabs
  teachers: any = [];
  
  courses: any = [
    // {name:"angular"},
    // {name:"node"},
    // {name:"spring"},
  ];

  students: any = [];
  

  teacherId: any;
  courseId: any;
  studentId: any;

  selectedTeacherId: any;   // Variable pour stocker l'ID de l'enseignant sélectionné
  selectedCourseId: any;        // Variable pour stocker l'ID du cours sélectionné
  selectedStudentId: any = [];   // Tableau pour stocker les ID des étudiants sélectionnés

  constructor(
    private userService: UserService,
    private courseServise: CourseService,
    private clasService: ClasseService,
    private router: Router
  ) { }

  ngOnInit() {
    // list of Teachers
    this.userService.getTeachers().subscribe((response) => {
      this.teachers = response.teachers;
      this.teacherId = this.teachers[0]._id;
    });

    // list of Courses
    this.courseServise.getAllCourses().subscribe((response) => {
      this.courses = response.courses;
      this.courseId = this.courses[0]._id;
    });

    //  list of Students
    this.userService.getStudents().subscribe((response) => {
      this.students = response.students;
      this.studentId = this.students[0]._id;
    });
  }

  select(event, status: string) {
    const value = event.target.value;

    if (status === 'teacher') {
      this.selectedTeacherId = value;      
    } else if (status === 'course') {
      this.selectedCourseId = value;
    } else if (status === 'student') {
      if (!this.selectedStudentId) {
        this.selectedStudentId = [value];
        console.log(this.selectedStudentId);
        
      } else if (this.selectedStudentId.includes(value)) {
        // Désélectionnez l'étudiant s'il a déjà été sélectionné
        this.selectedStudentId = this.selectedStudentId.filter(id => id !== value);
      } else {
        // else add to list
        this.selectedStudentId.push(value);
      }
    }
  }


  addClassroom() {
    // Création de l'objet class avec les sélections
    this.class = {
      name: this.class.name,
      teacherId: this.selectedTeacherId,
      courseId: this.selectedCourseId,
      studentsId: this.selectedStudentId
    };

    console.log("Class", this.class);

    this.clasService.addClass(this.class).subscribe((response) => {
      console.log("Here response from BE", response.msg);
      this.router.navigate(["dashboardAdmin-users"]);
    });
  }

}
