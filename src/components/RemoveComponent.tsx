import React from 'react';
import { KEYS } from './constants';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props: {
  className: string,
  onRemove: (
    tag:
      | {
          id: string,
          [key: string]: string,
        }
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void,
  readOnly: boolean,
  removeComponent: React.ComponentType<any>,
  tag: {
    id: string,
    className: string,
    [key: string]: string,
  },
  index: number,
}) => {
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
