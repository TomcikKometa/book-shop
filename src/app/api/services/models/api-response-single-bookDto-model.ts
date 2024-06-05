export interface ApiSingleBookInfoDto {
  authors: Author[];
  cover: string;
  epochs: string;
  genres: string;
  kinds: string;
  title: string;
  media: Media[];
  pdf:string,
  audio_length:string,
  txt:string
}

export interface Epoch {
  url: string;
  href: string;
  name: string;
  slug: string;
}

export interface Genre {
  url: string;
  href: string;
  name: string;
  slug: string;
}

export interface Kind {
  url: string;
  href: string;
  name: string;
  slug: string;
}

export interface Author {
  url: string;
  href: string;
  name: string;
  slug: string;
}

export interface Media {
  url: string;
  director: string;
  type: string;
  name: string;
  artist: string;
}
