import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Services/student-service.service';
import { StudentDTO } from '../Models/StudentModel';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent{
  students: StudentDTO[] = [];
  constructor(
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.getAllStudents();
    console.log(this.students);
  }

  getAllStudents(){
    this.studentService.getAll().subscribe({
      next:(res: StudentDTO[]) => {
        this.students = res;
    },
    error: (error) => {
      console.error('Erro ao buscar tipos de fonte de dados:', error);
    },
    complete: () => {
      console.log('Busca de tipos de fonte de dados concluída!');
    }

  });
}

}
