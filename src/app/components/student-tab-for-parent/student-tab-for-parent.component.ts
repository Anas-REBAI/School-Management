import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-tab-for-parent',
  templateUrl: './student-tab-for-parent.component.html',
  styleUrls: ['./student-tab-for-parent.component.css']
})
export class StudentTabForParentComponent implements OnInit {

  notes: any=[];
  tel :any;
  constructor(
    private userService : UserService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.tel = this.route.snapshot.paramMap.get("phoneChild"); 
    this.userService.getStudentByTel(this.tel).subscribe((res)=>{
      this.notes = res.notes
    })
  }

}
