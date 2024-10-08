import { Injectable, DestroyRef } from '@angular/core';
import { ApiBooksService } from './api-books/api-books.service';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { ApiBookModel } from './models/api-response-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import generateUniqueId from 'generate-unique-id';
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
  private isSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isSpinner: Observable<boolean> = this.isSpinner$.asObservable();
  private isData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isData: Observable<boolean> = this.isData$.asObservable();
  private isFiltered$: Subject<number> = new Subject<number>();
  public isFiltered: Observable<number> = this.isFiltered$.asObservable();
  public startPartBooksItems = 0;
  public endPartBooksItems = 25;

  private searchTitle: string = '';
  private searchAuthor: string = '';
  private searchEpoch: string = '';
  private filteredBySearch: ApiBookModel[] = [];

  constructor(
    private readonly apiBooksService: ApiBooksService,

    private readonly distroyReference: DestroyRef
  ) {
    this.getBooks();
    localStorage.clear();
    this.isFiltered$.next(0);
  }

  public getBooks() {
    this.isSpinner$.next(true);
    this.apiBooksService
      .getAllBooks()
      .pipe(takeUntilDestroyed(this.distroyReference))
      .subscribe((data: ApiBookModel[]) => {
        setTimeout(() => {
          this.isSpinner$.next(false), this.handleGenerateNumberOfCards(data);
          this.isData$.next(false);
        }, 500);
      });

    this.apiBooksService
      .getAllBooksForFilter()
      .pipe(takeUntilDestroyed(this.distroyReference))
      .subscribe((data: ApiBookModel[]) => {
        this.allBooks = data;
      });
  }

  public searchBooks(search: string, type: SearchType) {
    search = search.charAt(0).toUpperCase() + search.slice(1);
    this.searchTitle = type === SearchType.SEARCH_TITLE ? (this.searchTitle = search) : this.searchTitle;
    (this.searchAuthor = type === SearchType.SEARCH_AUTHOR ? (this.searchAuthor = search) : this.searchAuthor),
      localStorage.clear();
    this.searchEpoch = type === SearchType.SEARCH_EPOCH ? (this.searchEpoch = search) : this.searchEpoch;

    if (this.searchAuthor.length > 1 && !this.searchTitle && !this.searchEpoch) {
      localStorage.clear();
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.author.includes(this.searchAuthor);
      });
      localStorage.setItem('filterSearch', JSON.stringify(this.filteredBySearch));
      this.clearNumberOfCards();
      this.getBooks();
      this.isFiltered$.next(1);
    } else if (this.searchTitle.length > 1 && !this.searchAuthor && !this.searchEpoch) {
      localStorage.clear();
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.title.includes(this.searchTitle);
      });

      localStorage.setItem('filterSearch', JSON.stringify(this.filteredBySearch));
      this.clearNumberOfCards();
      this.getBooks();
    } else if (this.searchEpoch.length > 1 && !this.searchAuthor && !this.searchEpoch) {
      this.filteredBySearch = this.allBooks.filter((value: ApiBookModel) => {
        return value.epoch.includes(this.searchEpoch);
      });
      localStorage.setItem('filterSearch', JSON.stringify(this.filteredBySearch));
    } else if (this.searchAuthor.length > 1 && this.searchTitle.length > 1 && this.searchEpoch.length > 1) {
      this.filteredBySearch = this.filteredBySearch.filter((value: ApiBookModel) => {
        return value.author.includes(search) && value.title.includes(search) && value.epoch.includes(search);
      });

      localStorage.setItem('filterSearch', JSON.stringify(this.filteredBySearch));
    } else if (this.searchAuthor.length > 1 && this.searchTitle.length > 1) {
      this.filteredBySearch = this.filteredBySearch.filter((value: ApiBookModel) => {
        return value.author.includes(this.searchAuthor) && value.title.includes(this.searchTitle);
      });

      localStorage.setItem('filterSearch', JSON.stringify(this.filteredBySearch));
      this.startPartBooksItems = 0;
      this.endPartBooksItems = 25;
      this.getBooks();
    }

    if (this.searchAuthor.length < 1 && this.searchEpoch.length < 1 && this.searchTitle.length < 1) {
      localStorage.clear();
      this.clearNumberOfCards();
      this.getBooks();
      this.isFiltered$.next(1);
      this.filteredBySearch = [];
    }
  }

  public changedPage(currentPage: number) {
    currentPage = currentPage - 1;
    this.startPartBooksItems = currentPage * 25;
    this.endPartBooksItems = this.startPartBooksItems + 25;
    this.getBooks();
  }

  public changedBackwardPage(page: number) {
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

  public changedFarwardPage(page: number) {
    let pageIndex = page - 1;
    this.startPartBooksItems = pageIndex * 25;
    this.endPartBooksItems = this.startPartBooksItems + 25;

    if (this.filteredBySearch.length > 0) {
      this.handleGenerateNumberOfCards(this.filteredBySearch);
    } else this.getBooks();
  }

  private handleGenerateNumberOfCards(data: ApiBookModel[], type?: string): void {
    const responseBooksPerPage: ApiBookModel[] = [];
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
  }

  private handleGeneratePageNumber(dataLength: number) {
    let numberOfPages: number = 0;
    numberOfPages = Math.ceil(dataLength / 25);
    this.numberOfPages$.next(numberOfPages);
  }

  private mapDataBookResponse(bookItem: ApiBookModel): ApiBookModel {
    return {
      author: this.mapBookItemStrings(bookItem?.author),
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
      title: this.mapBookItemStrings(bookItem?.title),
      url: bookItem?.url,
      price: this.mapPrice()
    };
  }

  private mapBookItemStrings(bookTitle: string): string {
    if (bookTitle?.length > 25) {
      return bookTitle.slice(0, 22) + '...';
    } else return bookTitle;
  }

  private mapBookItemGenre(bookGenre: string) {
    if (bookGenre?.includes(',')) {
      return bookGenre.split(',')[0] + ', ' + bookGenre.split(',')[1];
    } else if (bookGenre === '') {
      return 'Brak danych';
    } else return bookGenre;
  }

  private clearNumberOfCards() {
    this.startPartBooksItems = 0;
    this.endPartBooksItems = 25;
  }

  private mapPrice(): string {
    const price: string = generateUniqueId({
      length: 2,
      useLetters: false,
      excludeSymbols: ['0']
    });
    return price;
  }
}
