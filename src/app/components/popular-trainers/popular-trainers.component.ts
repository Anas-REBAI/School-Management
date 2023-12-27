import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popular-trainers',
  templateUrl: './popular-trainers.component.html',
  styleUrls: ['./popular-trainers.component.css']
})
export class PopularTrainersComponent implements OnInit {
  TeachersTabPop : any =[];
  constructor(
    private userService : UserService,
  ) { }

  ngOnInit() {
    this.userService.getTeachers().subscribe((res)=>{
      this.TeachersTabPop = res.teachers
    })
  }

}
