import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' }, // redireciona para a lista de estudantes
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'subjects', component: SubjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
