import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ClassNames from 'classnames';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';

const ItemTypes = { TAG: 'tag' };

type TagProps = {
  labelField: string,
  onDelete: (tag: { id: string, [key: string]: string }) => void,
  tag: { id: string, className: string, [key: string]: string },
  moveTag: (dragIndex: number, hoverIndex: number) => void,
  removeComponent: React.ComponentType<any>,
  onTagClicked: (
    event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => void,
  classNames: {
    tag: string,
    remove: string,
  },
  readOnly: boolean,
  index: number,
  allowDragDrop: boolean,
};

const Tag = (props: TagProps) => {
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
    drop: (item: TagProps) => {
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
  return (
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
};

export default Tag;
