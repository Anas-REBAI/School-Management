import { Component, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-structure',
  templateUrl: './teacher-structure.component.html',
  styleUrls: ['./teacher-structure.component.css']
})
export class TeacherStructureComponent implements OnInit {

  @Input () teacherStructureInput :any;
  @Output () teacherStructureOutput :any;

  trainerTab : any=[];

  constructor(
    private userService : UserService,
  ) { }

  ngOnInit() {
    // this.userService.getTeachers().subscribe((res)=>{
    //   this.trainerTab = res.teachers;
    // })
  }

  delete(id){
    // this.userService.deleteUser(id).subscribe((res)=>{
    //   console.log("here response ", res.msg);
    //   this.teacherStructureOutput.emit(this.trainerTab);
    //   this.userService.getTeachers().subscribe((res)=>{
    //     this.trainerTab = res.teachers;
    //   })
    // })

  }

}
