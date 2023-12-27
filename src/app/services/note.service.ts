import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteUrl : string = "http://localhost:3001/api/notes"

  constructor(private http : HttpClient) { }

  addNote(newNote){
    return this.http.post<{msg: any}>(this.noteUrl, newNote);
  }

  getAllNotes(){
    return this.http.get<{notes :any}>(this.noteUrl);
  }

  getNoteByIdStudentTeacher(Obj){
    return this.http.post<{ notes: any }>(`${this.noteUrl}/student/For/teacher`, Obj)
  }

  editNote(noteObj){
    return this.http.put<{isUpddated : any}>(this.noteUrl, noteObj);
  }

  // tjib note wahda 
  getNoteByIdNote(id){
    return this.http.get<{note: any}>(`${this.noteUrl}/getNote/${id}`);
  }

  // tjib notet lkol
  getNoteByStudentId(id){
    return this.http.get<{classes :any}>(`${this.noteUrl}/get/${id}`);
  }
}

