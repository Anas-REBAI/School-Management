import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { ClasseService } from 'src/app/services/classe.service';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit {

  id_teacher: any;
  groupsTeacherTab: any = [];
  students: any = [];
  notes: any = [];
  filePreview: any;
  bulletin: any = {};
  bulletinStudent: any = {};
  groupId: any;
  studentId: any;
  note: any;
  evaluation: any;

  constructor(
    private claService: ClasseService,
    private noteService: NoteService,
  ) { }

  ngOnInit() {
    this.loadGroups();
    this.loadBulletins();
  }

  loadGroups() {
    this.id_teacher = (this.decodeToken(sessionStorage.getItem("token"))).id;
    this.claService.getClassByTeacherId(this.id_teacher).subscribe((response) => {
      console.log("Here response from BE", response);
      this.groupsTeacherTab = response.classes;
    });
  }

  loadBulletins() {
    this.noteService.getAllNotes().subscribe((response) => {
      console.log("Here response from BE", response);
      this.notes = response.notes;
    });
  }
  evaluateStudent(idGroup, idStudent) {

    const bulletin = this.notes.find(b => b.classId === idGroup && b.studentId === idStudent);

    Swal.fire({
      title: 'Ajouter une évaluation et une note',
      html:
        '<input id="evaluation" class="swal2-input" placeholder="Évaluation">' +
        '<input id="note" type="number" class="swal2-input" placeholder="Note">',
      showCancelButton: true,
      confirmButtonText: 'Valider',

      preConfirm: () => {
        const evaluation = (<HTMLInputElement>document.getElementById('evaluation')).value;
        const note = (<HTMLInputElement>document.getElementById('note')).value;
        return { evaluation, note };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { evaluation, note } = result.value;

        if (bulletin) {
          // Mettre à jour le bulletin existant
          bulletin.evaluation = evaluation;
          bulletin.note = note;
          console.log("Here bulletin", bulletin);

          this.noteService.editNote(bulletin).subscribe((response) => {
            console.log('Réponse du backend', response);

          });
        } else {
          // Créer un nouveau bulletin
          const newBulletin = {
            classId: idGroup,
            studentId: idStudent,
            evaluation: evaluation,
            note: note
          };

          this.noteService.addNote(newBulletin).subscribe((response) => {
            console.log('Réponse du backend', response);
          });
        }
        this.loadBulletins();
        this.loadGroups();
      }
      
    });
  }

  displayStudent(idGroup, idStudent) {
    this.bulletinStudent = {
      idGroup: idGroup,
      idStudent: idStudent
    };
    console.log(this.bulletinStudent);

    this.noteService.getNoteByIdStudentTeacher(this.bulletinStudent).subscribe((response) => {
      console.log('Réponse du backend', response);

      // Vérifiez que "notes" est un tableau et prenez le premier élément s'il existe
      const studentTab = Array.isArray(response.notes) && response.notes.length > 0
        ? response.notes[0]
        : null;

      if (studentTab) {
        Swal.fire({
          title: 'l\'évaluation et la note',
          html:
            `<div> Evaluation : ${studentTab.evaluation}</div>` +
            `<div> Note : ${studentTab.note}</div>`,
        });
      } else {
        // Gérez le cas où les données ne sont pas disponibles ou mal structurées
        console.error('Données incorrectes ou non disponibles dans la réponse du backend');
        this.loadBulletins();
      }
    });
  }
  decodeToken(token: string): any {
    return jwt_decode(token);
  }

}
