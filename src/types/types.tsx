export interface Track {
    _id: number;
    name: string;
    author: string;
    release_date: string;
    album: string;
    duration_in_seconds?: number;
    genre?: string;
    track_file: string;
}
  
export type PopupType = 'author' | 'release_date' | 'genre';

export interface ControlBarProps {
    currentTrack: Track | null;
    audio: HTMLAudioElement | null;
    onPlayPause: () => void;
    onShuffle: () => void;
    onNextTrack: () => void;
    onPreviousTrack: () => void;
    isRepeat: boolean;
    onToggleRepeat: () => void; 
    currentTime: number;
    totalTime: number;
}

export interface TrackListProps {
    tracks: Track[];
    onPlayTrack: (track: Track) => void;
    currentTrackId: number | null;
}


export interface FiltersProps {
    activeFilter: PopupType | null;
    popups: Record<PopupType, boolean>;
    getUniqueAuthors: string[];
    getUniqueGenres: string[];
    handleShowPopup: (type: PopupType) => void;
    handleClosePopup: (type: PopupType) => void;
}

export interface PopupProps {
    content: string | string[];
    onClose: () => void;
}