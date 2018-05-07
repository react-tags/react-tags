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
    return <span/>;
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

class Tag extends Component {
  static propTypes = {
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
    tagRenderer: PropTypes.func,
  };
  
  static defaultProps = {
    labelField: 'text',
    readOnly: false,
  };
  
  render = () => {
    const {
      classNames,
      connectDragSource,
      connectDropTarget,
      isDragging,
      labelField,
      onDelete,
      onTagClicked,
      readOnly,
      removeComponent,
      tag,
      tagRenderer
    } = this.props;
    const label = tagRenderer ? tagRenderer(tag) : tag[labelField];
    
    const tagComponent = (
      <span
        style={{ opacity: isDragging ? 0 : 1 }}
        className={classNames.tag}
        onClick={onTagClicked}>
        {label}
        <RemoveComponent
          tag={tag}
          className={classNames.remove}
          removeComponent={removeComponent}
          onClick={onDelete}
          readOnly={readOnly}
        />
      </span>
    );
    return connectDragSource(connectDropTarget(tagComponent));
  };
}

export default flow(
  DragSource(ItemTypes.TAG, tagSource, dragSource),
  DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
