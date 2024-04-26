import React from 'react';
import PropTypes from 'prop-types';
import { KEYS } from './constants';
import StickyNote from '../assets/sticky_note.svg';


const crossStr = String.fromCharCode(215);
const NotesComponent = (props) => {
  const { readOnly, notesComponent, onClick, className, tag, index, useIcon } = props;

  const onKeydown = (event) => {
    if (KEYS.ENTER.includes(event.keyCode) || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === KEYS.BACKSPACE) {
      onClick(event);
    }
  };

  if (readOnly) {
    return <span />;
  }

  const ariaLabel = `Tag at index ${index} with value ${tag.id} focussed. Press backspace to remove`;
  if (notesComponent) {
    const Component = notesComponent;
    return (
      <Component
        onClick={onClick}
        onKeyDown={onKeydown}
        className={className}
        aria-label={ariaLabel}
        tag={tag}
        index={index}
        useIcon={useIcon}
      />
    );
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeydown}
      className={className}
      type="button"
      aria-label={ariaLabel}>
      {useIcon?<img src={StickyNote} />:crossStr}
    </button>
  );
};

NotesComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  notesComponent: PropTypes.func,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  useIcon: PropTypes.bool.isRequired
};

export default NotesComponent;
