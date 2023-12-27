import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errorMsg : string;

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      pwd:["", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    })
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe((response)=>{
      if (response.token){
        sessionStorage.setItem("token", response.token);
        // hedhi bch taatini object eli bch nekho menno juste role
        let role = this.decodeToken(response.token).role
        if (role == "admin"){
          this.router.navigate(["dashboardAdmin-users"]);
        }else if (role == "student"){
          this.router.navigate(["dashboard-Student"]);
        }else if (role == "teacher"){
          this.router.navigate(["dashboard-Teacher"]);
        }else{
          this.router.navigate([""]);
        }
      } else {
        this.errorMsg = "Please check Phone number && Password"
      }
    }) 
  };
  

  decodeToken(token: string) : any {
    return jwt_decode(token);
  };

}
