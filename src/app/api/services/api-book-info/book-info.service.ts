import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInfoComponent } from '../../../features/components/book-info/book-info.component';
import { HttpClient } from '@angular/common/http';
import { ApiSingleBookInfo } from '../models/api-response-single-book-model';
import { ApiBooksUrls } from '../../api-books-urls';
import { Observable, Subject, first, map } from 'rxjs';
import { ApiSingleBookInfoDto, Epoch, Genre, Kind, Media } from '../models/api-response-single-bookDto-model';

export enum MediaAudioType {
  MP3 = 'mp3'
}

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {
  private apiResponseSingleInfo$: Subject<ApiSingleBookInfoDto> = new Subject<ApiSingleBookInfoDto>();
  public apiResponseSingleInfo: Observable<ApiSingleBookInfoDto> = this.apiResponseSingleInfo$.asObservable();

  private readonly matDialog: MatDialog = inject(MatDialog);
  private readonly httpClient: HttpClient = inject(HttpClient);

  public openMatDialog(bookName: string): void {
    this.getSingleBookInfo(bookName);
    this.matDialog.open(BookInfoComponent, {
      width: '43vw',
      height: '28vw',
    });
  }

  public getSingleBookInfo(bookName: string): void {
    this.httpClient
      .get<ApiSingleBookInfo>(ApiBooksUrls.prepareGetSingleBookInfo() + bookName)
      .pipe(
        first(),
        map((response: ApiSingleBookInfo) => this.mapApiSingleBookResponse(response))
      )
      .subscribe((data: ApiSingleBookInfoDto) => {
        this.apiResponseSingleInfo$.next(data), console.log(data);
      });
      
  }

  private mapApiSingleBookResponse(bookItem: ApiSingleBookInfo): ApiSingleBookInfoDto {
    return {
      authors: bookItem?.authors,
      cover: bookItem?.cover,
      epochs: this.mapEpochs(bookItem?.epochs),
      genres: this.mapGenres(bookItem?.genres),
      kinds: this.mapKinds(bookItem?.kinds),
      title: bookItem?.title,
      media: this.mapMmdiaAudioType(bookItem?.media),
      pdf: bookItem?.pdf,
      audio_length: bookItem?.audio_length,
      txt: bookItem.txt
    };
  }

  private mapMmdiaAudioType(dataAudioType: Media[]): Media[] {
    let dataAudioTypeDto: Media[] = [];
    dataAudioTypeDto = dataAudioType.filter((x: Media) => x.type === 'mp3');
    return dataAudioTypeDto;
  }

  private mapEpochs(epoch: Epoch[]): string {
    return epoch[0].name ? epoch[0].name : 'brak danych'
  }

  private mapKinds(kind: Kind[]): string {
    return kind[0].name ? kind[0].name : 'brak danych'
  }

  private mapGenres(genre: Genre[]): string {
    return genre[0].name ? genre[0].name : 'brak danych'
  }
}
