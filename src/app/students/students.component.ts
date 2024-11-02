import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../Services/student-service.service';
import { StudentDTO } from '../Models/StudentModel';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent{
  students: StudentDTO[] = [];
  filteredStudents: StudentDTO[] = [];
  filterText: string = '';
  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllStudents();
    console.log(this.students);
  }

  getAllStudents(){
    this.studentService.getAll().subscribe({
      next:(res: StudentDTO[]) => {
        this.students = res;
        this.filteredStudents = res;
    },
    error: (error) => {
      console.error('Erro ao buscar tipos de fonte de dados:', error);
    },
    complete: () => {
      console.log('Busca de tipos de fonte de dados concluída!');
    }

  });
  }

  filterStudents() {
    const filterTextLower = this.filterText.toLowerCase();
    this.filteredStudents = this.students.filter(student =>
      student.nome.toLowerCase().includes(filterTextLower) ||
      student.id.toString().includes(filterTextLower)
    );
  }

  goToStudentProfile(studentId: number) {
    this.router.navigate(['/students', studentId]);
  }
}




