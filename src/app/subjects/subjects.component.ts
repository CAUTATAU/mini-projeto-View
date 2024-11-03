import { EnrollDTO } from './../Models/enrollModel';
import { SubjectService } from './../Services/subject.service';
import { StudentService } from '../Services/student-service.service';
import { EnrollService } from '../Services/enroll.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectDTO } from '../Models/SubjectModel';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  subjects: SubjectDTO[] = [];
  filteredSubjects: SubjectDTO[] = [];
  filterText: string = '';
  selectedSubject: any = null;
  student: SubjectDTO | undefined;
  showConfirmationDialog: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private studentService: StudentService,
    private enrollService: EnrollService
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
    this.studentService.currentStudent.subscribe(student => {
      this.student = student || undefined;
    });
  }

  getAllSubjects() {
    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects;
      this.filteredSubjects = subjects;
    });
  }

  filterSubjects() {
    const filterTextLower = this.filterText.toLowerCase();
    this.filteredSubjects = this.subjects.filter(subject =>
      subject.nome.toLowerCase().includes(filterTextLower)
    );
  }

  selectSubject(subjectId: number) {
    this.selectedSubject = this.subjects.find(subject => subject.id === subjectId);
    this.openConfirmationDialog();
  }

  openConfirmationDialog() {
    this.showConfirmationDialog = true;
  }

  confirmEnrollment() {
    if (this.student && this.selectedSubject) {
      let enrollData: EnrollDTO = {
        studentId: this.student.id,
        subjectName: this.selectedSubject.nome
      };
      this.enrollService.enroll(enrollData).subscribe({
        next: () => {
          console.log('Matrícula realizada com sucesso!');
          this.router.navigate(['/students', this.student?.id]);
        },
        error: (error) => {
          console.error('Erro ao realizar matrícula:', error);
        }
      });
    } else {
      console.error('Student or selected subject is undefined');
    }
  }

  cancelEnrollment() {
    this.selectedSubject = null;
    this.showConfirmationDialog = false;
  }
}
