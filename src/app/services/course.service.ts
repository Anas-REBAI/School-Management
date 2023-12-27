import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseUrl : string = "http://localhost:3001/api/courses"

  constructor(private http : HttpClient) { }

  addCourse(newCourse){
    return this.http.post<{msg: any}>(this.courseUrl, newCourse);
  }

  getAllCourses(){
    return this.http.get<{courses :any}>(this.courseUrl);
  }

  getCourseById(id){
    return this.http.get<{course :any}>(`${this.courseUrl}/${id}`);
  }

  editCourse(courseObj){
    return this.http.put<{isUpddated : any}>(this.courseUrl, courseObj);
  }

  deleteCourse(id){
    return this.http.delete<{msg: any}>(`${this.courseUrl}/${id}`);
  }

  showCoursesByTeacher(id){
    return this.http.get<{ courses: any }>(`${this.courseUrl}/teacher/${id}`);
  }
}
