'use strict';

var React = require('react');

var _require = require('react-dnd');

var DragSource = _require.DragSource;
var DropTarget = _require.DropTarget;

var flow = require('lodash/fp/flow');

var ItemTypes = { TAG: 'tag' };

var tagSource = {
    beginDrag: function beginDrag(props) {
        return { id: props.tag.id };
    },
    canDrag: function canDrag(props) {
        return !props.readOnly;
    }
};

var tagTarget = {
    hover: function hover(props, monitor) {
        var draggedId = monitor.getItem().id;
        if (draggedId !== props.id) {
            props.moveTag(draggedId, props.tag.id);
        }
    },
    canDrop: function canDrop(props) {
        return !props.readOnly;
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

var Tag = React.createClass({
    displayName: 'Tag',

    propTypes: {
        labelField: React.PropTypes.string,
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveTag: React.PropTypes.func,
        removeComponent: React.PropTypes.func,
        classNames: React.PropTypes.object
    },
    getDefaultProps: function getDefaultProps() {
        return {
            labelField: 'text'
        };
    },
    render: function render() {
        var label = this.props.tag[this.props.labelField];
        var _props = this.props;
        var connectDragSource = _props.connectDragSource;
        var isDragging = _props.isDragging;
        var connectDropTarget = _props.connectDropTarget;
        var readOnly = _props.readOnly;

        var CustomRemoveComponent = this.props.removeComponent;
        var RemoveComponent = React.createClass({
            displayName: 'RemoveComponent',

            render: function render() {
                if (readOnly) {
                    return React.createElement('span', null);
                }

                if (CustomRemoveComponent) {
                    return React.createElement(CustomRemoveComponent, this.props);
                }
                return React.createElement(
                    'a',
                    this.props,
                    'x'
                );
            }
        });
        var tagComponent = React.createElement(
            'span',
            { style: { opacity: isDragging ? 0 : 1 },
                className: this.props.classNames.tag },
            label,
            React.createElement(RemoveComponent, { className: this.props.classNames.remove,
                onClick: this.props.onDelete })
        );
        if (this.props.moveTag) {
            return connectDragSource(connectDropTarget(tagComponent));
        } else {
            return tagComponent;
        }
    }
});

module.exports = flow(DragSource(ItemTypes.TAG, tagSource, dragCollect), DropTarget(ItemTypes.TAG, tagTarget, dropCollect))(Tag);