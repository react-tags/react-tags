import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactTags } from '../ReactTags';

describe('ReactTags', () => {
  it('should render react tags input', () => {
    render(<ReactTags />);

    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
  });

  it('should hide react tags input when readOnly is set', () => {
    render(<ReactTags readOnly />);

    expect(screen.queryByTestId('tag-input')).not.toBeInTheDocument();
  });

  it('should set focus on the input if autofocus is set', () => {
    render(<ReactTags autofocus />);

    expect(screen.getByTestId('tag-input')).toHaveFocus();
  });
});
