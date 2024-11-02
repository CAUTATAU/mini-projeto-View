import { BookDTO } from "./BookModel";
import { SubjectDTO } from "./SubjectModel";

export interface StudentDTO {
    id: number;
    nome: string;
    curso: string;
    modalidade: string;
    status: string;
    subjects: SubjectDTO[];
    books: BookDTO[];
}
