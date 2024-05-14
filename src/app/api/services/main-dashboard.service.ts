import { Injectable } from '@angular/core';
import { ApiBooksService } from './api-books.service';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { ApiBookModel } from './models/api-response-model';

@Injectable({
  providedIn: 'root',
})
export class MainDashboardService {
  protected allBooks: ApiBookModel[] = [];
  private booksPerPage$: BehaviorSubject<ApiBookModel[]> = new BehaviorSubject<ApiBookModel[]>([]);
  public booksPerPage: Observable<ApiBookModel[]> = this.booksPerPage$.asObservable();

  startPartBooksItems = 0;
  endPartBooksItems = 25;
  numberofAllBooks = 8;
  numberOfPAges = 0;
  constructor(private readonly apiBooksService: ApiBooksService) {
    this.getBooks();
  }

  public getBooks() {
    this.apiBooksService
      .getAllBooks()
      .pipe(first())
      .subscribe((data: ApiBookModel[]) => {
        const responseBooksPerPage: ApiBookModel[] = [];
        for (
          this.startPartBooksItems;
          this.startPartBooksItems < this.endPartBooksItems;
          this.startPartBooksItems++
        ) {
          responseBooksPerPage.push(
            this.mapDataBookResponse(data[this.startPartBooksItems]),
          );
        }
        this.booksPerPage$.next(responseBooksPerPage);
        console.log(responseBooksPerPage);
        
        this.allBooks = data;
        this.numberOfPAges = Math.round(data.length / 25);
      });
  }

  mapDataBookResponse(bookItem: ApiBookModel): ApiBookModel {
    return {
      author: bookItem.author,
      cover: bookItem.cover,
      cover_color: bookItem.cover,
      cover_thumb: bookItem.cover_thumb,
      epoch: bookItem.epoch,
      full_sort_key: bookItem.full_sort_key,
      genre: this.mapBookItemGenre(bookItem.genre),
      has_audio: bookItem.has_audio,
      href: bookItem.href,
      kind: bookItem.kind,
      liked: bookItem.liked,
      simple_thumb: bookItem.simple_thumb,
      slug: bookItem.slug,
      title: this.mapBookItemTitle(bookItem.title),
      url: bookItem.url,
    };
  }

  mapBookItemTitle(bookTitle: string): string {
    if (bookTitle.length > 25) {
      return bookTitle.slice(0, 22) + '...';
    } else return bookTitle;
  }
  mapBookItemGenre(bookGenre: string) {
    if (bookGenre.includes(',')) {
      return bookGenre.split(',')[0] + ', ' + bookGenre.split(',')[1];
    } else return bookGenre;
  }

  searchBooks(search: string) {
    const serachUpperCase = search.charAt(0).toUpperCase() + search.slice(1);
    let filtered: ApiBookModel[] = [];
    filtered = this.allBooks.filter(
      (values) => values.title === serachUpperCase,
    );
    this.booksPerPage$.next(filtered);
  }
}
