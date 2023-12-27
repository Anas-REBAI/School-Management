import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // userURL => adresse du serveur Back.End
  userURL: string ="http://localhost:3001/api/users";

  constructor(private http : HttpClient) { }

  login(user){
    return this.http.post<{msg :any, token: string}>(this.userURL + "/login", user);
  }

  signUp(user, img:File){
    let formData = new FormData();
    //comment remplir le formData
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("phone", user.phone);
    formData.append("home", user.home);
    formData.append("role", user.role);
    formData.append("speciality", user.speciality);
    formData.append("phoneChild", user.phoneChild);
    formData.append("status", user.status);
    formData.append("img", img);  // file separé (edheka aleh me nhotouch user)
    
    return this.http.post<{msg: any}>(this.userURL + "/signup", formData);
  }

  getAllUser(){
    return this.http.get<{users: any}>(this.userURL);
  }

  getStudents(){
    return this.http.get<{students : any}>(this.userURL + "/students");
  }

  getTeachers(){
    return this.http.get<{teachers : any}>(this.userURL + "/teachers");
  }

  statusTeacherUpdate(staTeach) {
    return this.http.patch<{ isUpdated: boolean }>(this.userURL + "/status", staTeach);
  }

  getParents(){
    return this.http.get<{parents : any}>(this.userURL + "/parents");
  }

  getUserById(id){
    return this.http.get<{user: any}>(`${this.userURL}/${id}`)
  }

  editProfileUser(userObj){
    return this.http.put<{isUpddated : boolean}>(this.userURL, userObj)
  }

  deleteUser(id){
    return this.http.delete<{msg : any}>(`${this.userURL}/${id}`);
  }

  getStudentByTel(tel){
    return this.http.get<{notes:any}>(`${this.userURL}/student/${tel}`);
  }
}
