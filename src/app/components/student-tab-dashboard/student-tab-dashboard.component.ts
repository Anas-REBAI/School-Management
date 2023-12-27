import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-student-tab-dashboard',
  templateUrl: './student-tab-dashboard.component.html',
  styleUrls: ['./student-tab-dashboard.component.css']
})
export class StudentTabDashboardComponent implements OnInit {

  IdStudent: any;

  noteTab: any = [];

  bulletinStudent: any = {};

  constructor(private noteService : NoteService) { }

  ngOnInit() {
    this.IdStudent = (this.decodeToken(sessionStorage.getItem("token"))).id;
    this.noteService.getNoteByStudentId(this.IdStudent).subscribe((response) => {
      this.noteTab = response.classes;
    });
  }

  displayEvaluation(id){
    this.noteService.getNoteByIdNote(id).subscribe((response) => {
      this.bulletinStudent=response.note
      if (this.bulletinStudent) {
        Swal.fire({
          title: 'Evaluation && Note',
          html:
            `<div> Evaluation : ${this.bulletinStudent.evaluation}</div>` +
            `<div> Note : ${this.bulletinStudent.note}</div>`,
        });
      } else {
        // Gérez le cas où les données ne sont pas disponibles ou mal structurées
        console.error('Données incorrectes ou non disponibles dans la réponse du backend');
      }
    });

  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

}
