import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teachers',
  templateUrl: './search-teachers.component.html',
  styleUrls: ['./search-teachers.component.css']
})
export class SearchTeachersComponent implements OnInit {
  
  // ID form
  searchForm: FormGroup;

  teachersTabOnInit : any=[];

  searchTeachersTab : any=[];
 

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      speciality :["", [Validators.required]],
    })

    this.userService.getTeachers().subscribe((response)=>{
      this.teachersTabOnInit = response.teachers
    })
  }

  searchTeachers(){
    this.searchTeachersTab =[];
    let x = this.searchForm.value;
    
    this.searchTeachersTab = this.teachersTabOnInit.filter((teacher)=>{
      return teacher.speciality == x.speciality;
    })
  }

}
