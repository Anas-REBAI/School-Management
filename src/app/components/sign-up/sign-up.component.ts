import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
// import  Swal  from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  signupForm : FormGroup;
  imagePreview : any;
  pdfPreview:any;
  pdfData:any;
  file:any;
  document:any;
  
  selectedRole : any;

  errorMsg : any;

  users : any = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName :["", [Validators.required, Validators.minLength(3)]],
      lastName :["", [Validators.required, Validators.minLength(3)]],
      email :["", [Validators.required, Validators.email]],
      pwd :["", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      phone :["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      home :["", [Validators.required, Validators.minLength(4)]],
      role: [""],
    // specifics
      img:[""],
      speciality:["", [Validators.required]],
      phoneChild:["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      telephones: this.formBuilder.array([this.createTelephone()]),
    })
  }

  signup(){
    if(this.signupForm.value.role == "teacher"){
      this.signupForm.value.status="en Attente";
    }
    console.log("here user obj", this.signupForm.value)
    this.userService.signUp(this.signupForm.value, this.signupForm.value.img).subscribe((response)=>{
      this.errorMsg = response.msg;
    })
  }

  onRoleChange(role: string) {
    if (this.selectedRole === 'student') {
      this.signupForm.get('img').reset();         // Reset the photo field
    } else if (this.selectedRole === 'teacher') {
      this.signupForm.get('speciality').reset(); // Reset the speciality field
      this.signupForm.get('img').reset();       // Reset the file field
    }
    this.selectedRole = role;
  }

  onImageSelected(event: Event) {
    // recuperer le ficher selectionné
    const file = (event.target as HTMLInputElement).files[0];
    // implementation du file dans img
    this.signupForm.patchValue({ img: file });
    // Refresh SignUp form (l'ajout d'un ficher)
    this.signupForm.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: any): void {
      this.file = event.target.files[0];
      if (this.file && this.file.type === 'application/pdf') {
        this.readFileAsDataURL(this.file);
      } else {
        // Gérer les erreurs si le fichier n'est pas un PDF
        console.error('Veuillez sélectionner un fichier PDF valide.');
      }
    }
  private readFileAsDataURL(file: File): void {
    this.signupForm.patchValue({ file: file });
  this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const pdfDataUrl = event.target.result;
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUrl);
    };
    reader.readAsDataURL(file);
    this.document=file.name;
    console.log(this.document);
  }
 
  createTelephone(): FormGroup {
    return this.formBuilder.group({
      phoneChild: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  get telephones(): FormArray {
    return this.signupForm.get('telephones') as FormArray;
  }

  addTelephone(): void {
    this.telephones.push(this.createTelephone());
  }

  removeTelephone(index: number): void {
    this.telephones.removeAt(index);
  }

}