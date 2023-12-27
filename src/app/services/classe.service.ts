import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  classUrl : string = "http://localhost:3001/api/classes"

  constructor(private http : HttpClient) { }

  addClass(newClass){
    return this.http.post<{msg: any}>(this.classUrl, newClass);
  }

  getAllClass(){
    return this.http.get<{classes: any}>(this.classUrl);
  }

  getClassByTeacherId(id){
    return this.http.get<{ classes: any }>(`${this.classUrl}/${id}`)
  }

  editClass(classObj){
    return this.http.put<{isUpddated : any}>(this.classUrl, classObj);
  }

  deleteClass(id){
    return this.http.delete<{msg: any}>(`${this.classUrl}/${id}`);
  }
}
