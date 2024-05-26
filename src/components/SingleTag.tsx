import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ClassNames from 'classnames';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';

const ItemTypes = { TAG: 'tag' };

export interface Tag {
  id: string;
  className: string;
  [key: string]: string;
}

export interface TagProps {
  labelField?: string;
  onDelete: (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => void;
  tag: Tag;
  moveTag?: (dragIndex: number, hoverIndex: number) => void;
  removeComponent?: React.ComponentType<any>;
  onTagClicked: (
    event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => void;
  classNames: {
    tag: string;
    remove: string;
  };
  readOnly: boolean;
  index: number;
  allowDragDrop: boolean;
  tags: Tag[]
}

const SingleTag = (props: TagProps) => {
  const tagRef = useRef(null);
  const {
    readOnly = false,
    tag,
    classNames,
    index,
    moveTag,
    allowDragDrop = true,
    labelField = 'text',
    tags
  } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: props,
    canDrag: () => canDrag({ moveTag, readOnly, allowDragDrop }),
  }),[tags]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TAG,
    drop: (item: TagProps) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      props?.moveTag?.(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item),
  }),[tags]);

  drag(drop(tagRef));

  const label = props.tag[labelField];
  const { className = '' } = tag;
  /* istanbul ignore next */
  const opacity = isDragging ? 0 : 1;
  return (
    <span
      ref={tagRef}
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      style={{
        opacity,
        cursor: canDrag({ moveTag, readOnly, allowDragDrop }) ? 'move' : 'auto',
      }}
      data-testid="tag"
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

export { SingleTag };
