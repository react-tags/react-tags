import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';
import NotesComponent from './NotesComponent';

const ItemTypes = { TAG: 'tag' };

const Tag = (props) => {
  const tagRef = useRef(null);
  const { readOnly, tag, classNames, index } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: props,
    canDrag: () => canDrag(props),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TAG,
    drop: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      props.moveTag(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item),
  }));

  drag(drop(tagRef));

  const label = props.tag[props.labelField];
  const { className = '' } = tag;
  /* istanbul ignore next */
  const opacity = isDragging ? 0 : 1;
  const hasNotes = props.tag[props.hasNotesField] == true;
  const isProtected = props.tag[props.isProtectedField] == true;
  const tagComponent = (
    <span
      ref={tagRef}
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      style={{
        opacity,
        cursor: canDrag(props) ? 'move' : 'auto',
      }}
      onClick={props.onTagClicked}
      onTouchStart={props.onTagClicked}>
        {hasNotes?<NotesComponent
        tag={props.tag}
        className={classNames.notes}
        notesComponent={props.notesComponent}
        onClick={props.onNotesClicked}
        readOnly={readOnly}
        index={index}
        useIcon={hasNotes}
      />:null}
      <span>{label}</span>
      <RemoveComponent
        tag={props.tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onRemove={props.onDelete}
        readOnly={readOnly}
        index={index}
        useIcon={props.useRemoveIcon}
        isProtected={isProtected}
      />
    </span>
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  hasNotesField: PropTypes.string,
  isProtectedField: PropTypes.string,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  onNotesClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
  useRemoveIcon: PropTypes.bool
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
  hasNotesField: 'hasNotes',
  isProtectedField: 'isProtected',
  useRemoveIcon: true
};

export default Tag;
