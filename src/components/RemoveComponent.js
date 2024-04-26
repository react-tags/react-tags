import React from 'react';
import PropTypes from 'prop-types';
import { KEYS } from './constants';
import CloseIcon from '../assets/close.svg';
import LockIcon from '../assets/protected_close.svg';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { readOnly, removeComponent, onRemove, className, tag, index, useIcon, isProtected } = props;

  const onKeydown = (event) => {
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
        useIcon={useIcon}
        isProtected={isProtected}
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
      {useIcon?(isProtected?<img src={LockIcon}/>:<img src={CloseIcon}/>):crossStr}
    </button>
  );
};

RemoveComponent.propTypes = {
  className: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  removeComponent: PropTypes.func,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  useIcon: PropTypes.bool.isRequired,
  isProtected: PropTypes.bool.isRequired
};

export default RemoveComponent;
