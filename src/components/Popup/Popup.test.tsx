import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Popup from './Popup';
import React from 'react';

jest.mock('./popup.module.css', () => ({
  popup: 'popup',
  popupContent: 'popupContent',
  popupItem: 'popupItem',
}));

describe('Popup component', () => {
  const content = 'Test Content';
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders popup with single content', () => {
    render(<Popup content={content} onClose={onClose} />);

    const popupContent = screen.getByText(content);
    expect(popupContent).toBeInTheDocument();
  });

  it('renders popup with multiple content items (array)', () => {
    const arrayContent = ['Item 1', 'Item 2', 'Item 3'];
    render(<Popup content={arrayContent} onClose={onClose} />);

    arrayContent.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('calls onClose when clicking outside the popup', () => {
    render(<Popup content={content} onClose={onClose} />);

    fireEvent.mouseDown(document);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the popup', () => {
    render(<Popup content={content} onClose={onClose} />);
    const popupDiv = screen.getByText(content).closest('div');

    fireEvent.mouseDown(popupDiv as HTMLElement);

    expect(onClose).not.toHaveBeenCalled();
  });
});
