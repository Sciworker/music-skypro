import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

jest.mock('../../../public/icon/search.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="search-icon" />,
}));

describe('SearchBar Component', () => {
  it('renders the search icon', () => {
    render(<SearchBar />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the input field with the correct placeholder', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Поиск...');
    expect(input).toBeInTheDocument();
  });

  it('allows typing in the input field', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Поиск...');
    fireEvent.change(input, { target: { value: 'Test search' } });
    expect(input).toHaveValue('Test search');
  });
});
