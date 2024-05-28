export interface ApiSingleBookInfo {
    title: string
    url: string
    language: string
    epochs: Epoch[]
    genres: Genre[]
    kinds: Kind[]
    authors: Author[]
    translators: any[]
    fragment_data: FragmentData
    children: any[]
    parent: Parent
    preview: boolean
    epub: string
    mobi: string
    pdf: string
    html: string
    txt: string
    fb2: string
    xml: string
    media: Medum[]
    audio_length: string
    cover_color: string
    simple_cover: string
    cover_thumb: string
    cover: string
    simple_thumb: string
    isbn_pdf: any
    isbn_epub: any
    isbn_mobi: any
  }
  
  export interface Epoch {
    url: string
    href: string
    name: string
    slug: string
  }
  
  export interface Genre {
    url: string
    href: string
    name: string
    slug: string
  }
  
  export interface Kind {
    url: string
    href: string
    name: string
    slug: string
  }
  
  export interface Author {
    url: string
    href: string
    name: string
    slug: string
  }
  
  export interface FragmentData {
    title: string
    html: string
  }
  
  export interface Parent {
    kind: string
    full_sort_key: string
    title: string
    url: string
    cover_color: string
    author: string
    cover: string
    epoch: string
    href: string
    has_audio: boolean
    genre: string
    simple_thumb: string
    slug: string
    cover_thumb: string
    liked: any
  }
  
  export interface Medum {
    url: string
    director: string
    type: string
    name: string
    artist: string
  }