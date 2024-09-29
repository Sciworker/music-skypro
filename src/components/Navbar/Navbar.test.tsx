import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    const mainLink = screen.getByText('Главное');
    const playlistLink = screen.getByText('Мой плейлист');
    const loginLink = screen.getByText('Войти');
    expect(mainLink).toBeInTheDocument();
    expect(playlistLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it('toggles the menu when burger is clicked', () => {
    render(<Navbar />);
    const burger = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(burger);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navOpen');
  });
});
