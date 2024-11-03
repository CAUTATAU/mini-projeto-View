import { reservaDTO } from './../Models/reservaModel';
import { ReservaService } from './../Services/reserva.service';
import { StudentService } from './../Services/student-service.service';
import { Component } from '@angular/core';
import { StudentDTO } from '../Models/StudentModel';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDTO } from '../Models/BookModel';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  student: StudentDTO | undefined;
  books: BookDTO[] = [];

  constructor(
    private StudentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private ReservaService: ReservaService
  ){}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.StudentService.getStudent(id).subscribe({
      next: (res: StudentDTO) => {
        this.student = res;
        this.books = res.books;


      },
      error: (error) => {
        console.error('Erro ao buscar estudante:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }

  goToSubjects(){
    if (this.student) {
      this.StudentService.setStudent(this.student);
      this.router.navigate(['/students', this.student.id, 'subjects']);
    }

  }

  goToBooks(){
    if (this.student) {
      this.StudentService.setStudent(this.student);
      this.router.navigate(['/students', this.student.id, 'books']);
    }

  }

  returnBook(bookId: number): void {
    if (!this.student) return;

  const bookToReturn = this.student.books?.find(book => book.id === bookId);

  if (bookToReturn) {
    let data: reservaDTO = {
      studentId: this.student.id,
      bookTitle: bookToReturn.titulo
    };

    this.ReservaService.cancelReserve(data).subscribe({
      next: () => {
        this.student?.books?.splice(this.student.books.indexOf(bookToReturn), 1);
        console.log('Livro devolvido com sucesso');
      },
      error: (error) => {
        console.error('Erro ao devolver livro:', error);
      }
    });
  } else {
    console.error('Livro não encontrado para devolução');
  }
  }
}
