import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';

const ItemTypes = { TAG: 'tag' };

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

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

function RemoveComponent(props) {
  if (props.readOnly) {
    return <span />;
  }

  if (props.removeComponent) {
    const Component = props.removeComponent;
    return <Component {...props} />;
  }

  return (
    <a onClick={props.onClick} className={props.className}>
      {String.fromCharCode(215)}
    </a>
  );
}

RemoveComponent.propTypes = {
  readOnly: PropTypes.bool,
  removeComponent: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

class Tag extends Component {
  render = () => {
    const { props } = this;
    const label = props.tag[props.labelField];
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      readOnly,
      CustomRemoveComponent,
    } = props;

    const tagComponent = (
      <span
        style={{ opacity: isDragging ? 0 : 1 }}
        className={props.classNames.tag}
        onClick={props.onTagClicked}>
        {label}
        <RemoveComponent
          tag={props.tag}
          className={props.classNames.remove}
          removeComponent={props.removeComponent}
          onClick={props.onDelete}
          readOnly={props.readOnly}
        />
      </span>
    );
    return connectDragSource(connectDropTarget(tagComponent));
  };
}

Tag.propTypes = {
  classNames: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  labelField: PropTypes.string,
  moveTag: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onTagClicked: PropTypes.func,
  readOnly: PropTypes.bool,
  removeComponent: PropTypes.func,
  tag: PropTypes.object.isRequired,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default flow(
  DragSource(ItemTypes.TAG, tagSource, dragSource),
  DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
