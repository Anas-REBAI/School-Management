import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // id form
  userForm : FormGroup;

  id : any;
  findedUser : any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName :["", [Validators.required, Validators.minLength(3)]],
      lastName :["", [Validators.required, Validators.minLength(3)]],
      email :["", [Validators.required, Validators.email]],
      phone :["", [Validators.required, Validators.pattern('[0-9]{8}')]],
    })

    this.id = (this.decodeToken(sessionStorage.getItem("token"))).id;
    this.userService.getUserById(this.id).subscribe((data)=>{
      console.log("here user from BE", data.user);
      this.findedUser = data.user;  
      // Mettez à jour le formulaire avec les données de l'utilisateur (a la place de [ngModel])
      this.userForm.patchValue({
        firstName: this.findedUser.firstName,
        lastName: this.findedUser.lastName,
        email: this.findedUser.email,
        phone: this.findedUser.phone,
      });
    })

  }


  editProfile(){
    let obj=this.userForm.value;
    obj._id= (this.decodeToken(sessionStorage.getItem("token"))).id;
    this.userService.editProfileUser(obj).subscribe((response)=>{
      console.log("here res from BE", response.isUpddated); 
    })
    this.router.navigate([""])
  }


  decodeToken(token: string) : any {
    return jwt_decode(token);
  };

}
