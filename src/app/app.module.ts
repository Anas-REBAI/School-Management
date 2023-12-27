import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { GeneralDescriptionComponent } from './components/general-description/general-description.component';
import { PopularCoursesComponent } from './components/popular-courses/popular-courses.component';
import { PopularTrainersComponent } from './components/popular-trainers/popular-trainers.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventsComponent } from './components/events/events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { CoursesOneComponent } from './components/courses-one/courses-one.component';
import { DashbordAdminForUserComponent } from './components/dashbord-admin-for-user/dashbord-admin-for-user.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { TeacherStructureComponent } from './components/teacher-structure/teacher-structure.component';
import { NoteTableComponent } from './components/note-table/note-table.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentTabDashboardComponent } from './components/student-tab-dashboard/student-tab-dashboard.component';
import { StudentTabForParentComponent } from './components/student-tab-for-parent/student-tab-for-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    HomeComponent,
    CoursesComponent,
    TrainersComponent,
    GeneralDescriptionComponent,
    PopularCoursesComponent,
    PopularTrainersComponent,
    PricingComponent,
    LoginComponent,
    SignUpComponent,
    EventsComponent,
    StudentsTableComponent,
    AddCoursesComponent,
    SearchTeachersComponent,
    CoursesOneComponent,
    DashbordAdminForUserComponent,
    TeachersTableComponent,
    ParentsTableComponent,
    AddClassComponent,
    CoursesTableComponent,
    ClassesTableComponent,
    DashboardTeacherComponent,
    DashboardStudentComponent,
    TeacherStructureComponent,
    NoteTableComponent,
    ProfileComponent,
    StudentTabDashboardComponent,
    StudentTabForParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // import module  "TDF" && "reactive Form"
    FormsModule,
    ReactiveFormsModule,

    // import de http client
    HttpClientModule,

    // from site angular
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
