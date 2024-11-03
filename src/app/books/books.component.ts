import { StudentService } from './../Services/student-service.service';
import { Component } from '@angular/core';
import { BookService } from '../Services/book.service';
import { BookDTO } from '../Models/BookModel';
import { ReservaService } from '../Services/reserva.service';
import { SubjectDTO } from '../Models/SubjectModel';
import { Router } from '@angular/router';
import { reservaDTO } from '../Models/reservaModel';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  books: BookDTO[] = [];
  selectedBook: BookDTO | null = null;
  showConfirmationDialog = false;
  filteredBooks: BookDTO[] = [];
  filterText: string = '';
  student: SubjectDTO | undefined;

  constructor(
    private bookService: BookService,
    private reservaService: ReservaService,
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.studentService.currentStudent.subscribe(student => {
      this.student = student || undefined;
    });
  }

  getBooks(): void {
    this.bookService.getAll().subscribe({
        next:(res) => {
          this.books = res;
          this.filteredBooks = res;
        },
        error:(err) => {
          console.log(err);
        },
        complete:() => {
          console.log('dados coletados');
        }
      });
  }

  selectBook(bookId: number) {
    this.selectedBook = this.books.find(book => book.id === bookId) || null;
    this.openConfirmationDialog();
  }

  openConfirmationDialog() {
    this.showConfirmationDialog = true;
  }

  filterBooks() {
    const filterTextLower = this.filterText.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.titulo.toLowerCase().includes(filterTextLower)
    );
  }

  confirmReservation(): void {
    if (this.student && this.selectedBook) {
      let enrollData: reservaDTO = {
        studentId: this.student.id,
        bookTitle: this.selectedBook.titulo
      };
      this.reservaService.reserve(enrollData).subscribe({
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

  cancelReservation(): void {
    this.selectedBook = null;
    this.showConfirmationDialog = false;
  }
}
