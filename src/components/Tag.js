import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';

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
      {label}
      <RemoveComponent
        tag={props.tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onRemove={props.onDelete}
        readOnly={readOnly}
        index={index}
      />
    </span>
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default Tag;
