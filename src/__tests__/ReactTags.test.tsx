import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactTags } from '../ReactTags';

const user = userEvent.setup();

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

  it('should call handleInputChange with current input value if function is passed', async () => {
    const handleInputChange = jest.fn();

    render(<ReactTags handleInputChange={handleInputChange} />);

    await user.type(screen.getByTestId('tag-input'), 'tags');

    expect(handleInputChange).toHaveBeenCalledTimes(4);
    expect(handleInputChange).toHaveBeenLastCalledWith('tags');
  });

  it('it should overwrite default placeholder with the one passed inside inputProps', () => {
    render(<ReactTags inputProps={{ placeholder: 'Custom text' }} />);

    expect(screen.getByPlaceholderText('Custom text')).toBeInTheDocument();
  });
});
