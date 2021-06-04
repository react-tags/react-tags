import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';

const ItemTypes = { TAG: 'tag' };

const Tag = ({
  readOnly,
  tag,
  classNames,
  labelField,
  moveTag,
  allowDragDrop,
  index,
}) => {
  const label = tag[labelField];
  const { className = '' } = tag;

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TAG, id: tag.index, index: index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => canDrag({ moveTag, readOnly, allowDragDrop }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TAG,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items width
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveTag(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    canDrop: (props) => canDrop(props),
  });

  drag(drop(ref));

  return (
    <span
      ref={ref}
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      style={{opacity: isDragging ? 0 : 1, 'cursor': canDrag(props) ? 'move' : 'auto'}}
      onClick={props.onTagClicked}
      onTouchStart={props.onTagClicked}>
      {label}
      <RemoveComponent
        tag={tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onRemove={props.onDelete}
        readOnly={readOnly}
        index={index}
        onKeyDown={onkeydown}
      />
    </span>
  );
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
  isDragging: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  allowDragDrop: PropTypes.bool.isRequired,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default Tag;
