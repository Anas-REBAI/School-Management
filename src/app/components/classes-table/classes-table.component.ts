import { Component, Input, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.css']
})
export class ClassesTableComponent implements OnInit {

  @Input () classesTabInput: any=[];
  @Input () showTeacherNameForClasses : boolean; 
  @Input () actionsForClasses : boolean;    // bouton delete
  
  constructor(
    private claService : ClasseService,
  ) { }

  ngOnInit() {
  }

  editClasses(id){
    // il faut travailler get class by id dans app.js et dans le service
  }

  deleteClasses(id){
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
        // Delete class
        this.claService.deleteClass(id).subscribe((res)=>{
          // console.log("here response from BE", res.msg);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ) 
        })
      }
    })
  }



}
