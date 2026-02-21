export interface SaavnImage {
  quality: string;
  url?: string;
  link?: string;
}

export interface SaavnSong {
  id: string;
  name: string;
  duration: number | string;
  image?: SaavnImage[];
  artists?: {
    primary?: Array<{ name: string }>;
  };
  primaryArtists?: string;
  // Present on full song detail responses
  downloadUrl?: Array<{
    quality: string;
    url: string;
  }>;
}

export interface SaavnArtist {
  id: string;
  name: string;
  image?: SaavnImage[];
}

export interface SaavnPaginatedResult<T> {
  success?: boolean;
  status?: string;
  data: {
    total: number;
    start: number;
    results: T[];
  };
}

export interface MusicSong {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
}

export interface MusicArtist {
  id: string;
  name: string;
  image: string;
}

export interface MusicSongSearchResult {
  results: MusicSong[];
  total: number;
  start: number;
  hasMore: boolean;
}

export interface MusicArtistSearchResult {
  results: MusicArtist[];
  total: number;
  start: number;
}
