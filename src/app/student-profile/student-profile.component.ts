import { StudentService } from './../Services/student-service.service';
import { Component } from '@angular/core';
import { StudentDTO } from '../Models/StudentModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  student: StudentDTO | undefined;

  constructor(
    private StudentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.StudentService.getStudent(id).subscribe({
      next: (res: StudentDTO) => {
        this.student = res;
      },
      error: (error) => {
        console.error('Erro ao buscar estudante:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
