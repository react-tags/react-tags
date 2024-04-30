import React from 'react';
import { KEYS } from './constants';
import { Tag } from './SingleTag';

const crossStr = String.fromCharCode(215);

export interface RemoveComponentProps {
  onRemove: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  readOnly: boolean;
  removeComponent?: React.ComponentType<any>;
  className?: string;
  tag: Tag;
  index: number;
}

const RemoveComponent = (props: RemoveComponentProps) => {
  const { readOnly, removeComponent, onRemove, className, tag, index } = props;

  const onKeydown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (KEYS.ENTER.includes(event.keyCode) || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === KEYS.BACKSPACE) {
      onRemove(event);
    }
  };

  if (readOnly) {
    return <span />;
  }

  const ariaLabel = `Tag at index ${index} with value ${tag.id} focussed. Press backspace to remove`;
  if (removeComponent) {
    const Component = removeComponent;
    return (
      <Component
        data-testid="remove"
        onRemove={onRemove}
        onKeyDown={onKeydown}
        className={className}
        aria-label={ariaLabel}
        tag={tag}
        index={index}
      />
    );
  }

  return (
    <button
      data-testid="remove"
      onClick={onRemove}
      onKeyDown={onKeydown}
      className={className}
      type="button"
      aria-label={ariaLabel}>
      {crossStr}
    </button>
  );
};

export default RemoveComponent;
