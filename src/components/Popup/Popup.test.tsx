import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Popup from './Popup';
import React from 'react';

jest.mock('./popup.module.css', () => ({
  popup: 'popup',
  popupContent: 'popupContent',
  popupItem: 'popupItem',
  active: 'active',
}));

describe('Popup component', () => {
  const content = 'Test Content';
  const onClose = jest.fn();
  const onSelect = jest.fn();
  const activeItems = ['item 1'];

  beforeEach(() => {
    onClose.mockClear();
    onSelect.mockClear();
  });

  it('renders popup with single content', () => {
    render(
      <Popup
        content={content}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={activeItems}
      />
    );

    const popupContent = screen.getByText(content);
    expect(popupContent).toBeInTheDocument();
  });

  it('renders popup with multiple content items (array)', () => {
    const arrayContent = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <Popup
        content={arrayContent}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={activeItems}
      />
    );

    arrayContent.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('applies the active class to active items', () => {
    const arrayContent = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <Popup
        content={arrayContent}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={['item 2']}
      />
    );

    const activeItem = screen.getByText('Item 2');
    expect(activeItem).toHaveClass('active');
  });

  it('calls onClose when clicking outside the popup', () => {
    render(
      <Popup
        content={content}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={activeItems}
      />
    );

    fireEvent.mouseDown(document);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the popup', () => {
    render(
      <Popup
        content={content}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={activeItems}
      />
    );
    const popupDiv = screen.getByText(content).closest('div');

    fireEvent.mouseDown(popupDiv as HTMLElement);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onSelect and onClose when an item is clicked', () => {
    const arrayContent = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <Popup
        content={arrayContent}
        onClose={onClose}
        onSelect={onSelect}
        activeItems={activeItems}
      />
    );

    const itemToClick = screen.getByText('Item 1');
    fireEvent.click(itemToClick);

    expect(onSelect).toHaveBeenCalledWith('Item 1');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
