import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {

  teachersTab : any =[];

  acceptTeacher : any={};
  
  constructor(
    private userService : UserService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.userService.getTeachers().subscribe((response)=>{
      this.teachersTab = response.teachers;
    })
  }
  

  validate(id){
    this.acceptTeacher.id = id
    this.acceptTeacher.status = "confirme"
    this.userService.statusTeacherUpdate(this.acceptTeacher).subscribe((res)=>{
      console.log(res.isUpdated);
      // reload
      this.userService.getTeachers().subscribe((response)=>{
        this.teachersTab = response.teachers;
      })
    })
  }


  refuse(x){
    this.userService.deleteUser(x).subscribe((res)=>{
      console.log("here res from BE", res.msg); 
      // reload
      this.userService.getTeachers().subscribe((response)=>{
        this.teachersTab = response.teachers;
      })
    })
  }


}
