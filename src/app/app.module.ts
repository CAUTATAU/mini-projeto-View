import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule } from '@angular/forms';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectService } from './Services/subject.service';
import { StudentService } from './Services/student-service.service';
import { EnrollService } from './Services/enroll.service';
import { BooksComponent } from './books/books.component';
import { BookService } from './Services/book.service';
import { ReservaService } from './Services/reserva.service';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentProfileComponent,
    SubjectsComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    SubjectService,
    StudentService,
    EnrollService,
    BookService,
    ReservaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
