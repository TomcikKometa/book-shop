import { Injectable, DestroyRef } from '@angular/core';
import { ApiBooksService } from './api-books.service';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { ApiBookModel } from './models/api-response-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export enum SearchType {
  SEARCH_TITLE = 'title',
  SEARCH_AUTHOR = 'author',
  SEARCH_EPOCH = 'epoch'
}
@Injectable({
  providedIn: 'root'
})
export class MainDashboardService {
  protected allBooks: ApiBookModel[] = [];
  private booksPerPage$: BehaviorSubject<ApiBookModel[]> = new BehaviorSubject<ApiBookModel[]>([]);
  public booksPerPage: Observable<ApiBookModel[]> = this.booksPerPage$.asObservable();
  private numberOfPages$: Subject<number> = new Subject<number>();
  public numberOfPages: Observable<number> = this.numberOfPages$.asObservable();
  private filtered$: Subject<boolean> = new Subject<boolean>();
  public filtered: Observable<boolean> = this.filtered$.asObservable();

  startPartBooksItems = 0;
  endPartBooksItems = 25;

  searchTitle: string = '';
  searchAuthor: string = '';
  searchEpoch: string = '';
  filteredBySearch: ApiBookModel[] = [];

  constructor(
    private readonly apiBooksService: ApiBooksService,
    private readonly distroyReference: DestroyRef
  ) {
    this.getBooks();
  }

  public getBooks() {
    this.apiBooksService
      .getAllBooks()
      .pipe(takeUntilDestroyed(this.distroyReference))
      .subscribe((data: ApiBookModel[]) => {
        this.handleGenerateNumberOfCards(data);
      });
  }

  mapDataBookResponse(bookItem: ApiBookModel): ApiBookModel {
    return {
      author: bookItem?.author,
      cover: bookItem?.cover,
      cover_color: bookItem?.cover,
      cover_thumb: bookItem?.cover_thumb,
      epoch: bookItem?.epoch,
      full_sort_key: bookItem?.full_sort_key,
      genre: this.mapBookItemGenre(bookItem?.genre),
      has_audio: bookItem?.has_audio,
      href: bookItem?.href,
      kind: bookItem?.kind,
      liked: bookItem?.liked,
      simple_thumb: bookItem?.simple_thumb,
      slug: bookItem?.slug,
      title: this.mapBookItemTitle(bookItem?.title),
      url: bookItem?.url
    };
  }

  mapBookItemTitle(bookTitle: string): string {
    if (bookTitle?.length > 25) {
      return bookTitle.slice(0, 22) + '...';
    } else return bookTitle;
  }
  mapBookItemGenre(bookGenre: string) {
    if (bookGenre?.includes(',')) {
      return bookGenre.split(',')[0] + ', ' + bookGenre.split(',')[1];
    } else if (bookGenre === '') {
      return 'Brak danych';
    } else return bookGenre;
  }

  searchBooks(search: string, type: SearchType) {
    search = search.charAt(0).toUpperCase() + search.slice(1);
    const filter = 'filter';
    this.searchTitle = type === SearchType.SEARCH_TITLE ? (this.searchTitle = search) : this.searchTitle;
    this.searchAuthor = type === SearchType.SEARCH_AUTHOR ? (this.searchAuthor = search) : this.searchAuthor;
    this.searchEpoch = type === SearchType.SEARCH_EPOCH ? (this.searchEpoch = search) : this.searchEpoch;

    if (this.searchAuthor.length > 1 && !this.searchTitle) {
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.author.includes(this.searchAuthor);
      });
      this.handleGenerateNumberOfCards(this.filteredBySearch);
    } else if (this.searchTitle.length > 1 && !this.searchAuthor) {
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.title.includes(this.searchTitle);
      });
      this.handleGenerateNumberOfCards(this.filteredBySearch, filter);
    } else if (this.searchEpoch.length > 1 && !this.searchAuthor) {
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.epoch.includes(this.searchEpoch);
      });
      this.handleGenerateNumberOfCards(this.filteredBySearch, filter);
      this.filtered$.next(true);

    } else if (this.searchAuthor.length > 1 && this.searchTitle.length > 1 && this.searchEpoch.length > 1) {
      
      if (this.searchAuthor.length > 1) {
        this.filteredBySearch = this.filteredBySearch.filter((value: ApiBookModel) => {
          return value.author.includes(search);
        });
      } else if (this.searchTitle.length > 1) {
        this.filteredBySearch = this.filteredBySearch.filter((value: ApiBookModel) => {
          return value.title.includes(search);
        });
      } else if (this.searchEpoch.length > 1) {
        this.filteredBySearch = this.filteredBySearch.filter((value: ApiBookModel) => {
          return value.epoch.includes(search);
        });
      }
      
      
      this.handleGenerateNumberOfCards(this.filteredBySearch,filter);
    } else {
      this.startPartBooksItems = 0;
      this.endPartBooksItems = 25;
      this.getBooks();
    }
    console.log(this.filteredBySearch);
  }

  changedFarwardPage(page: number) {
    let pageIndex = page - 1;
    this.startPartBooksItems = pageIndex * 25;
    this.endPartBooksItems = this.startPartBooksItems + 25;

    if (this.filteredBySearch.length > 0) {
      this.handleGenerateNumberOfCards(this.filteredBySearch);
    } else this.getBooks();
  }

  changedPage(currentPage: number) {
    if ((this.searchAuthor.length || this.searchTitle.length || this.searchEpoch.length) > 1) {
      currentPage = currentPage - 1;
      this.startPartBooksItems = currentPage * 25;
      this.endPartBooksItems = this.startPartBooksItems + 25;
      this.handleGenerateNumberOfCards(this.filteredBySearch);
    } else {
      
      currentPage = currentPage - 1;
      this.startPartBooksItems = currentPage * 25;
      this.endPartBooksItems = this.startPartBooksItems + 25;
      
      this.getBooks();
    }
  }

  changedBackwardPage(page: number) {
    let pageIndex = page - 2;
    if (page <= 2) {
      pageIndex = 1;
      this.startPartBooksItems = 0;
      this.endPartBooksItems = this.startPartBooksItems + 25;
    } else {
      this.startPartBooksItems = pageIndex * 25;
      this.endPartBooksItems = this.startPartBooksItems + 25;
    }

    if (this.filteredBySearch.length > 0) {
      this.handleGenerateNumberOfCards(this.filteredBySearch);
    } else this.getBooks();
  }

  handleGeneratePageNumber(dataLength: number) {
    let numberOfPages: number = 0;
    numberOfPages = Math.ceil(dataLength / 25);
    this.numberOfPages$.next(numberOfPages);
  }

  private handleGenerateNumberOfCards(data: ApiBookModel[], type?: string): void {
    const responseBooksPerPage: ApiBookModel[] = [];
    if (type === 'filter') {
      this.startPartBooksItems = 0;
      this.endPartBooksItems = 25;
    }

    if (data.length - this.endPartBooksItems < 0) {
      const diffrenceLength: number = Math.abs(data.length - this.endPartBooksItems);
      this.endPartBooksItems = this.endPartBooksItems - diffrenceLength;
    }
    
    for (this.startPartBooksItems; this.startPartBooksItems < this.endPartBooksItems; this.startPartBooksItems++) {
      responseBooksPerPage.push(this.mapDataBookResponse(data[this.startPartBooksItems]));
    }
    this.booksPerPage$.next(responseBooksPerPage);
    this.allBooks = data;
    this.handleGeneratePageNumber(data.length);
    console.log();
    
  }
}
