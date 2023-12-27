import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parents-table',
  templateUrl: './parents-table.component.html',
  styleUrls: ['./parents-table.component.css']
})
export class ParentsTableComponent implements OnInit {

  parentsTab : any =[];

  constructor(
    private userService : UserService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.userService.getParents().subscribe((response)=>{
      this.parentsTab = response.parents
    })
  }


  refuse(x){
    this.userService.deleteUser(x).subscribe((res)=>{
      console.log("here res from BE", res.msg);
      this.userService.getParents().subscribe((response)=>{
        this.parentsTab = response.parents
      })
    })
  }

}
