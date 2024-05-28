export class ApiBooksUrls {
  private static readonly API_PREFIX: string = 'https://wolnelektury.pl/api';

  public static prepareGetAllBooks(): string {
    return `${ApiBooksUrls.API_PREFIX}/books`;
  }

  public static prepareGetSingleBookInfo(): string {
    return `${ApiBooksUrls.API_PREFIX}/books/`
  }
}