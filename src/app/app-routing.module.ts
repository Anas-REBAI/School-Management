import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventsComponent } from './components/events/events.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { DashbordAdminForUserComponent } from './components/dashbord-admin-for-user/dashbord-admin-for-user.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { GeneralDescriptionComponent } from './components/general-description/general-description.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentTabForParentComponent } from './components/student-tab-for-parent/student-tab-for-parent.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"about", component:GeneralDescriptionComponent},
  {path:"courses", component:CoursesComponent},
  {path:"trainers", component:TrainersComponent},
  {path:"pricing", component:PricingComponent},
  {path:"login", component:LoginComponent},
  {path:"signUp", component:SignUpComponent},
  {path:"events", component:EventsComponent},
  {path:"profile", component:ProfileComponent},

  {path:"dashboardAdmin-users", component:DashbordAdminForUserComponent},
  {path:"dashboard-Teacher", component:DashboardTeacherComponent},
  {path:"dashboard-Student", component:DashboardStudentComponent},
  
  {path:"addCourses", component:AddCoursesComponent},
  {path:"addClass", component:AddClassComponent},
  {path:"find-teacher", component:SearchTeachersComponent},
  {path:"searchTel/:phoneChild",component: StudentTabForParentComponent},
  
  {path:"studentTable", component:StudentsTableComponent},
  {path:"parentsTable", component:ParentsTableComponent},
  {path:"teachersTable", component:TeachersTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
