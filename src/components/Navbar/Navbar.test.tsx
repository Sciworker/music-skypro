import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';
import { RootState } from '../../redux/store';

const mockStore = configureStore<RootState>();

describe('Navbar Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
      },
      playlist: {
      },
      favorites: {},
      selections: {},
    } as RootState);
  });

  const renderWithProvider = (ui: React.ReactNode, store: ReturnType<typeof mockStore>) =>
    render(<Provider store={store}>{ui}</Provider>);

  it('renders the logo and links', () => {
    renderWithProvider(<Navbar />, store);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    const mainLink = screen.getByText('Главное');
    const favoritesLink = screen.getByText('Мой плейлист');
    expect(mainLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it('toggles menu when burger is clicked', () => {
    renderWithProvider(<Navbar />, store);

    const navElement = screen.getByRole('navigation');
    expect(navElement).not.toHaveClass('navOpen');

    const burgerButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(burgerButton);

    expect(navElement).toHaveClass('navOpen');

    fireEvent.click(burgerButton);
    expect(navElement).not.toHaveClass('navOpen');
  });

  it('renders "Войти" link if user is not logged in', () => {
    renderWithProvider(<Navbar />, store);

    const signInLink = screen.getByText('Войти');
    expect(signInLink).toBeInTheDocument();
  });

  it('renders "Выйти" if user is logged in', () => {
    store = mockStore({
      auth: {
        isLoggedIn: true,
      },
      playlist: {},
      favorites: {},
      selections: {},
    } as RootState);

    renderWithProvider(<Navbar />, store);

    const logoutButton = screen.getByText('Выйти');
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls logout function when "Выйти" is clicked', () => {
    const mockDispatch = jest.fn();
    store = mockStore({
      auth: {
        isLoggedIn: true,
      },
      playlist: {},
      favorites: {},
      selections: {},
    } as RootState);

    renderWithProvider(<Navbar />, store);

    const logoutButton = screen.getByText('Выйти');
    fireEvent.click(logoutButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
