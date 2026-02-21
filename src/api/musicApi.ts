import { axiosInstance } from './axiosInstance';
import {
  MusicArtist,
  MusicArtistSearchResult,
  MusicSong,
  MusicSongSearchResult,
  SaavnArtist,
  SaavnImage,
  SaavnPaginatedResult,
  SaavnSong,
} from '@app-types/music.types';

type SearchSongsParams = {
  query: string;
  page?: number;
  limit?: number;
};

type SearchArtistsParams = {
  query: string;
  page?: number;
  limit?: number;
};

const FALLBACK_IMAGE =
  'https://www.jiosaavn.com/_i/3.0/def_album_150.png';

const decodeHtml = (value: string) =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&amp;', '&')
    .replaceAll('&#039;', "'");

const formatDuration = (durationValue: number | string | undefined) => {
  const totalSeconds = Number(durationValue) || 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getBestImage = (images: SaavnImage[] | undefined) => {
  if (!images || images.length === 0) {
    return FALLBACK_IMAGE;
  }

  const preferred =
    images.find((item) => item.quality === '500x500') ??
    images.find((item) => item.quality === '150x150') ??
    images[images.length - 1];

  return preferred.url ?? preferred.link ?? FALLBACK_IMAGE;
};

const mapSong = (song: SaavnSong): MusicSong => {
  const primaryArtists = song.artists?.primary?.map((artist) => artist.name).filter(Boolean);
  const artistName =
    (primaryArtists && primaryArtists.length > 0 ? primaryArtists.join(', ') : song.primaryArtists) ||
    'Unknown Artist';

  return {
    id: song.id,
    title: decodeHtml(song.name),
    artist: decodeHtml(artistName),
    duration: formatDuration(song.duration),
    image: getBestImage(song.image),
  };
};

const mapArtist = (artist: SaavnArtist): MusicArtist => ({
  id: artist.id,
  name: decodeHtml(artist.name),
  image: getBestImage(artist.image),
});

export const searchSongs = async ({
  query,
  page = 1,
  limit = 12,
}: SearchSongsParams): Promise<MusicSongSearchResult> => {
  const response = await axiosInstance.get<SaavnPaginatedResult<SaavnSong>>('/api/search/songs', {
    params: { query, page, limit },
  });

  const payload = response.data.data;
  const results = payload.results.map(mapSong);
  const fetchedCount = page * limit;

  return {
    results,
    total: payload.total,
    start: payload.start,
    hasMore: fetchedCount < payload.total,
  };
};

export const searchArtists = async ({
  query,
  page = 1,
  limit = 8,
}: SearchArtistsParams): Promise<MusicArtistSearchResult> => {
  const response = await axiosInstance.get<SaavnPaginatedResult<SaavnArtist>>(
    '/api/search/artists',
    {
      params: { query, page, limit },
    }
  );

  const payload = response.data.data;

  return {
    results: payload.results.map(mapArtist),
    total: payload.total,
    start: payload.start,
  };
};

const pickBestStreamUrl = (items: SaavnSong['downloadUrl']): string => {
  if (!items || items.length === 0) {
    throw new Error('No audio URL available for this song.');
  }

  const preferredOrder = ['160kbps', '96kbps', '48kbps', '12kbps'];
  const byQuality = (q: string) => items.find((item) => item.quality === q);
  const match = preferredOrder.map(byQuality).find(Boolean);

  return (match ?? items[items.length - 1]).url;
};

export const getSongStream = async (
  id: string
): Promise<{ song: MusicSong; streamUrl: string }> => {
  const response = await axiosInstance.get<{ success: boolean; data: SaavnSong[] }>(
    `/api/songs/${id}`
  );

  const raw = response.data.data[0];
  if (!raw) {
    throw new Error('Song not found');
  }

  const song = mapSong(raw);
  const streamUrl = pickBestStreamUrl(raw.downloadUrl);

  return { song, streamUrl };
};
