import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  
  studentsTab : any =[
    // {_id:"223JMT456", firstName:"anas", lastName:"rebai", email:"anas@gmail.com", pwd:"azerty123", phone: 26018778, home:"2 rue mars"},
  ];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getStudents().subscribe((response)=>{
      this.studentsTab = response.students;
    })
  }

  deleteStudent(id){
    this.userService.deleteUser(id).subscribe((response)=>{
      console.log("here response from BE", response.msg);
       
      this.userService.getStudents().subscribe((response)=>{
        this.studentsTab = response.students;
      })
    })
  }

}

