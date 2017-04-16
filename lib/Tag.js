import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const ItemTypes = { TAG: 'tag' };

const tagSource = {
  beginDrag: (props) => { return { id: props.tag.id } },
  canDrag: (props) => props.moveTag && !props.readOnly
};

const tagTarget = {
  hover: (props, monitor) => {
    var draggedId = monitor.getItem().id;
    if (draggedId !== props.id) {
      props.moveTag(draggedId, props.tag.id);
    }
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
    const { connectDragSource, isDragging, connectDropTarget, readOnly, CustomRemoveComponent } = props;

    const tagComponent = (
      <span style={{ opacity: isDragging ? 0 : 1 }} className={props.classNames.tag}>
        {label}
        <RemoveComponent
          className={props.classNames.remove}
          removeComponent={props.removeComponent}
          onClick={props.onDelete}
          readOnly={props.readOnly} />
      </span>
    );
    return connectDragSource(connectDropTarget(tagComponent));
  }
}

Tag.PropTypes = {
  labelField: React.PropTypes.string,
  onDelete: React.PropTypes.func.isRequired,
  tag: React.PropTypes.object.isRequired,
  moveTag: React.PropTypes.func,
  removeComponent: React.PropTypes.func,
  classNames: React.PropTypes.object,
  readOnly: React.PropTypes.bool,
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

export default flow(
  DragSource(ItemTypes.TAG, tagSource, dragSource),
  DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag);
