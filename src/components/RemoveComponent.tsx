import React from 'react';
import { KEYS } from './constants';
import { Tag } from './SingleTag';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="12"
        width="12"
        fill="#fff">
        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
      </svg>
    </button>
  );
};

export default RemoveComponent;
