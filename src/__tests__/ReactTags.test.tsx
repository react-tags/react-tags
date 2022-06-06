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

  it('should call onInputChange with current input value if function is passed', async () => {
    const onInputChange = jest.fn();

    render(<ReactTags onInputChange={onInputChange} />);

    await user.type(screen.getByTestId('tag-input'), 'tags');

    expect(onInputChange).toHaveBeenCalledTimes(4);
  });

  it('should call onInputFocus with current input value if function is passed', async () => {
    const onInputFocus = jest.fn();

    render(<ReactTags onInputFocus={onInputFocus} />);

    await user.type(screen.getByTestId('tag-input'), 'tags');

    expect(onInputFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onInputBlur with current input value if function is passed', async () => {
    const onInputBlur = jest.fn();

    render(<ReactTags onInputBlur={onInputBlur} />);

    const tagInput = screen.getByTestId('tag-input');

    tagInput.focus();
    tagInput.blur();

    expect(onInputBlur).toHaveBeenCalledTimes(1);
  });

  it('should overwrite default placeholder with the one passed inside inputProps', () => {
    render(<ReactTags inputProps={{ placeholder: 'Custom text' }} />);

    expect(screen.getByPlaceholderText('Custom text')).toBeInTheDocument();
  });

  it('should render default tags list if defaultTags provided', () => {
    render(<ReactTags defaultTags={[{ value: 'poland', label: 'Poland' }]} />);

    expect(screen.getByText('Poland')).toBeInTheDocument();
  });

  it('should render "Clear all" button with custom label, clear all tags on click and call onClearAll method', async () => {
    const onClearAll = jest.fn();

    render(
      <ReactTags
        defaultTags={[{ value: 'poland', label: 'Poland' }]}
        allowClear
        clearText="Remove tags"
        onClearAll={onClearAll}
      />
    );

    const clearAllButton = screen.getByTestId('clear-all');

    expect(clearAllButton).toBeInTheDocument();
    expect(screen.getByText('Remove tags')).toBeInTheDocument();
    await user.click(clearAllButton);
    expect(onClearAll).toBeCalledTimes(1);
    expect(screen.queryByText('Poland')).not.toBeInTheDocument();
  });

  it('should add a new tag on Enter key down and call onTagAdd method', async () => {
    const onTagAdd = jest.fn();

    render(<ReactTags onTagAdd={onTagAdd} />);

    await user.type(screen.getByTestId('tag-input'), 'Germany{enter}');

    expect(onTagAdd).toBeCalledTimes(1);
    expect(onTagAdd).toBeCalledWith({ value: 'Germany', label: 'Germany' });
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });
});
