import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import Chip from 'material-ui/Chip';


const ItemTypes = { TAG: 'tag' };

const tagSource = {
  beginDrag: (props) => { return { id: props.tag.id, index: props.index } },
  canDrag: (props) => props.moveTag && !props.readOnly
};

const tagTarget = {
  hover: (props, monitor, component) => {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left side
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items width

      // Dragging to the right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging to the left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
      }

      // Time to actually perform the action
      props.moveTag(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
  },
  canDrop: (props) => !props.readOnly
};

const dragSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const style = {
  margin: 4,
  cursor: 'move'
};

function RemoveComponent(props) {
  if (props.readOnly) {
    return <span />;
  }

  if (props.removeComponent) {
    const Component = props.removeComponent;
    return <Component {...props} />;
  }

  return <a onClick={props.onClick} className={props.className}>{String.fromCharCode(215)}</a>;
}

class Tag extends Component {
  render = () => {
    const { props } = this;
    const label = props.tag[props.labelField];
    const { connectDragSource, isDragging, connectDropTarget, readOnly } = props;

    const tagComponent = (
      <div>
        <Chip
          onRequestDelete={() => {
              console.log("hi");
              props.onDelete();
          }}
          style={{opacity: isDragging ? 0 : 1, ...style}}
          className={props.classNames.tag}>
          {label}
        </Chip>
      </div>
    );
    return connectDragSource(connectDropTarget(tagComponent));
  }
}

Tag.PropTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

export default flow(
  DragSource(ItemTypes.TAG, tagSource, dragSource),
  DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
