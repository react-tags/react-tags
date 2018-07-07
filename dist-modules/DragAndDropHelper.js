'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropCollect = exports.dragSource = exports.tagTarget = exports.tagSource = undefined;

var _reactDom = require('react-dom');

var tagSource = {
  beginDrag: function beginDrag(props) {
    return { id: props.tag.index, index: props.index };
  },
  canDrag: function canDrag(props) {
    return props.moveTag && !props.readOnly;
  }
};

var tagTarget = {
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
    var hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    var clientOffset = monitor.getClientOffset();
    var hoverClientX = clientOffset.x - hoverBoundingRect.left;

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
  canDrop: function canDrop(props) {
    return !props.readOnly;
  }
};

var dragSource = function dragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var dropCollect = function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

exports.tagSource = tagSource;
exports.tagTarget = tagTarget;
exports.dragSource = dragSource;
exports.dropCollect = dropCollect;