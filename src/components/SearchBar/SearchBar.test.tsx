import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renders the input field with the correct placeholder', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Поиск...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Поиск...');

    await userEvent.type(input, 'Test search');

    expect(mockOnSearch).toHaveBeenCalledTimes(10);
    expect(mockOnSearch).toHaveBeenLastCalledWith('Test search');
  });

  it('handles empty input correctly', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Поиск...');

    await userEvent.type(input, 'Test');
    await userEvent.clear(input);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});

