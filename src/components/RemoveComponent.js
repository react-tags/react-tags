import React from 'react';
import PropTypes from 'prop-types';
import {KEYS} from './constants';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { readOnly, removeComponent, onRemove, className, tag, index } = props;

  const onKeydown = (event) => {
    console.log(event);
    if (event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) {
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

  if (removeComponent) {
    const Component = removeComponent;
    return <Component {...props} />;
  }

  return (
    <button
      onClick={onRemove}
      onKeyDown={onKeydown}
      className={className}
      aria-label={`Tag at index ${index} with value ${tag.id} focussed. Press backspace to remove`}>
      {crossStr}
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
};

export default RemoveComponent;
