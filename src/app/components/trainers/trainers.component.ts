import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  TeachersTab : any =[];

  constructor(
    private userService : UserService,
  ) { }

  ngOnInit() {
    this.userService.getTeachers().subscribe((res)=>{
      this.TeachersTab = res.teachers
    })
  }


  // MAJ trainer "@output"
  updateTrainers(T : any){
    this.TeachersTab = T;
  }

}
