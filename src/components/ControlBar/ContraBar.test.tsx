import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ControlBar from './ControlBar';
import { AudioProvider } from '../AudioContext/AudioContext';
import { Track } from '@/redux/playlist/types';

jest.mock('../../../public/icon/prev.svg', () => () => <svg data-testid="prev-button" />);
jest.mock('../../../public/icon/play.svg', () => () => <svg data-testid="play-button" />);
jest.mock('../../../public/icon/pause.svg', () => () => <svg data-testid="pause-button" />);
jest.mock('../../../public/icon/next.svg', () => () => <svg data-testid="next-button" />);
jest.mock('../../../public/icon/repeat.svg', () => () => <svg data-testid="repeat-button" />);
jest.mock('../../../public/icon/shuffle.svg', () => () => <svg data-testid="shuffle-button" />);
jest.mock('../../../public/icon/volume.svg', () => () => <svg data-testid="volume-icon" />);
jest.mock('../../../public/icon/like.svg', () => () => <svg data-testid="like-button" />);
jest.mock('../../../public/icon/liked.svg', () => () => <svg data-testid="liked-button" />);

const mockAudio = {
  paused: true,
  volume: 0.5,
  currentTime: 0,
  duration: 300,
  play: jest.fn(),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
} as unknown as HTMLAudioElement;

const mockTrack: Track = {
  _id: 1,
  name: 'Mock Track',
  author: 'Mock Author',
  release_date: '2023-01-01',
  album: 'Mock Album',
  duration_in_seconds: 300,
  genre: 'Mock Genre',
  track_file: 'file1.mp3',
  audioSrc: 'https://example.com/file1.mp3',
};

const mockStore = configureStore();
const initialState = {
  favorites: {
    favoriteTracks: [],
    loading: false,
    error: null,
  },
};

describe('ControlBar Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly when a track is selected', () => {
    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={jest.fn()}
            onNextTrack={jest.fn()}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={jest.fn()}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.getByText('Mock Track')).toBeInTheDocument();
    expect(screen.getByText('Mock Author')).toBeInTheDocument();
  });

  it('calls onPlayPause when play button is clicked', () => {
    const onPlayPause = jest.fn();

    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={onPlayPause}
            onNextTrack={jest.fn()}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={jest.fn()}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);

    expect(onPlayPause).toHaveBeenCalledTimes(1);
  });

  it('calls onNextTrack when next button is clicked', () => {
    const onNextTrack = jest.fn();

    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={jest.fn()}
            onNextTrack={onNextTrack}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={jest.fn()}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    expect(onNextTrack).toHaveBeenCalledTimes(1);
  });

  it('updates volume when volume slider is changed', () => {
    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={jest.fn()}
            onNextTrack={jest.fn()}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={jest.fn()}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    const volumeSlider = screen.getByLabelText('volume slider');
    fireEvent.change(volumeSlider, { target: { value: '80' } });

    expect(mockAudio.volume).toBe(0.8);
  });

  it('renders like and unlike buttons based on track favorite state', () => {
    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={jest.fn()}
            onNextTrack={jest.fn()}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={jest.fn()}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toBeInTheDocument();
  });

  it('calls onToggleRepeat when repeat button is clicked', () => {
    const onToggleRepeat = jest.fn();

    render(
      <Provider store={store}>
        <AudioProvider value={{ audio: mockAudio, setAudio: jest.fn() }}>
          <ControlBar
            currentTrack={mockTrack}
            onPlayPause={jest.fn()}
            onNextTrack={jest.fn()}
            onPreviousTrack={jest.fn()}
            isRepeat={false}
            isShuffle={false}
            onToggleRepeat={onToggleRepeat}
            onToggleShuffle={jest.fn()}
            totalTime={300}
          />
        </AudioProvider>
      </Provider>
    );

    const repeatButton = screen.getByTestId('repeat-button');
    fireEvent.click(repeatButton);

    expect(onToggleRepeat).toHaveBeenCalledTimes(1);
  });
});
