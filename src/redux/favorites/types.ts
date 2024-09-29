export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  album: string;
  duration_in_seconds?: number;
  genre?: string;
  track_file: string;
  audioSrc: string;
}