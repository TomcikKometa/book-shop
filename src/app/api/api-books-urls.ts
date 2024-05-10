export class ApiBooksUrls {
  private static readonly API_PREFIX: string = '/api';

  public prepareGetAllBooks(): string {
    return `${ApiBooksUrls.API_PREFIX} + '/books'`;
  }
}
