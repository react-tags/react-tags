import { findDOMNode } from 'react-dom';

const tagSource = {
  beginDrag: (props) => {
    return { id: props.tag.index, index: props.index };
  },
  canDrag: (props) => props.moveTag && !props.readOnly,
};

const tagTarget = {
  hover: (props, monitor, component) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
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

    props.moveTag(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
  canDrop: (props) => !props.readOnly,
};

const dragSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

const dropCollect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

export { tagSource, tagTarget, dragSource, dropCollect };
