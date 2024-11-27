import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TrackList from './TrackList';
import { Track } from '@/redux/playlist/types';

interface RootState {
  favorites: {
    favoriteTracks: Track[];
  };
  selections: {
    loading: boolean;
  };
}

const mockStore = configureStore<RootState>();

jest.mock('../../../public/icon/note.svg', () => () => 'MockedNoteIcon');
jest.mock('../../../public/icon/like-track.svg', () => () => 'MockedLikeIcon');
jest.mock('../../../public/icon/liked.svg', () => () => 'MockedLikedIcon');

describe('TrackList Component', () => {
  let store: ReturnType<typeof mockStore>;

  const mockTracks: Track[] = [
    {
      _id: 1,
      name: 'Track 1',
      author: 'Author 1',
      release_date: '2023-01-01',
      album: 'Album 1',
      duration_in_seconds: 300,
      genre: 'Pop',
      track_file: 'file1.mp3',
      audioSrc: 'https://example.com/file1.mp3',
    },
    {
      _id: 2,
      name: 'Track 2',
      author: 'Author 2',
      release_date: '2023-02-01',
      album: 'Album 2',
      duration_in_seconds: 250,
      genre: 'Rock',
      track_file: 'file2.mp3',
      audioSrc: 'https://example.com/file2.mp3',
    },
  ];

  beforeEach(() => {
    store = mockStore({
      favorites: { favoriteTracks: [] },
      selections: { loading: false },
    });
  });

  it('renders a list of tracks', () => {
    render(
      <Provider store={store}>
        <TrackList tracks={mockTracks} onPlayTrack={jest.fn()} currentTrackId={null} isPlaying={false} />
      </Provider>
    );

    const trackItems = screen.getAllByText(/Track/i);
    expect(trackItems).toHaveLength(mockTracks.length);
  });

  it('calls onPlayTrack when a track is clicked', () => {
    const mockOnPlayTrack = jest.fn();
    render(
      <Provider store={store}>
        <TrackList tracks={mockTracks} onPlayTrack={mockOnPlayTrack} currentTrackId={null} isPlaying={false} />
      </Provider>
    );

    const trackLink = screen.getByText('Track 1');
    fireEvent.click(trackLink);

    expect(mockOnPlayTrack).toHaveBeenCalledTimes(1);
    expect(mockOnPlayTrack).toHaveBeenCalledWith(mockTracks[0]);
  });
});
